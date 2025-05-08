import Typewriter from "@/components/typewriter";
import { getGameChat } from "@/services/getChat";
import { GameListItem } from "@/services/getGame";
import { PlayerListItem } from "@/services/getPlayer";
import { numberToRoman } from "@/utils/format";
import socket from "@/utils/websocket";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useEffect, useState } from "react";
type chatMessageProps = {
  gameData: GameListItem;
  playerList: PlayerListItem[];
};
const ChatMessageItem = ({
  content,
  reasoning,
}: {
  reasoning: string;
  content: string;
}) => {
  const [isReasoning, setIsReasoning] = useState(false);
  return (
    <>
      <div className=" text-sm mt-1 bg-[#1A1A1A] p-3 rounded-lg text-[#acacac]">
        <p>{"<Reasoning>"}</p>
        <Typewriter
          text={reasoning || "This model is not supported"}
          className="max-h-[100px] custom-scrollbar"
          onComplete={() => setIsReasoning(true)}
        />
      </div>
      {isReasoning && (
        <div className="mt-4">
          <p className="text-[#63a11a] mb-4">{"<Message>"}</p>
          <Typewriter text={content} />
        </div>
      )}
    </>
  );
};
export default function ChatMessage({
  gameData,
  playerList,
}: chatMessageProps) {
  const [aiList, setAiList] = useState<
    (PlayerListItem & {
      phraseList: { reasoning: string; content: string; phrase: number }[];
    })[]
  >([]);
  useEffect(() => {
    if (playerList.length === 0) return;
    getGameChat(gameData._id, gameData.phrase, gameData.round).then((res) => {
      const groupByPhrase = res.reduce((acc, item) => {
        const key = item.playerId.toString();
        if (!acc[key]) {
          acc[key] = [];
        }
        if (acc[key].length <= item.phrase) {
          acc[key][item.phrase] = {
            reasoning: "",
            content: "",
            phrase: item.phrase,
          };
        }
        if (item.type === 1) {
          acc[key][item.phrase].content = item.content;
        } else if (item.type === 2) {
          acc[key][item.phrase].reasoning = item.content;
        }
        return acc;
      }, {} as { [key: string]: { reasoning: string; content: string; phrase: number }[] });
      const list = playerList.map((item) => {
        return {
          ...item,
          phraseList: groupByPhrase[item._id.toString()] || [],
        };
      });
      setAiList(list);
    });
  }, [playerList, gameData._id, gameData.phrase, gameData.round]);
  const socketByAiList = (socketData: {
    playerId: number;
    message: {
      content: string;
      reasoning?: string;
    };
  }) => {
    setAiList((list) => {
      const newList = [...list];
      newList.forEach((item) => {
        if (item._id === socketData.playerId) {
          item.phraseList?.push({
            content: socketData.message.content,
            reasoning: socketData.message.reasoning || "",
            phrase: item.phraseList.length || 0,
          });
        }
      });
      return newList;
    });
  };
  useEffect(() => {
    const handleImposters = (res: string) => {
      const socketData = JSON.parse(res);
      console.log(socketData);
      socketByAiList(socketData);
    };

    socket.on("imposters", handleImposters);

    return () => {
      socket.off("imposters", handleImposters);
    };
  }, [socketByAiList]);

  return (
    <div className="mt-7 space-y-6 h-[calc(100vh-380px)] overflow-y-auto custom-scrollbar">
      {aiList.map((item) => {
        return (
          <div className="flex gap-x-4 " key={item._id}>
            <div>
              <img
                className="w-[60px] h-[60px] rounded-sm"
                src={item.img || "/img/ai.png"}
                alt=""
              />
            </div>
            <div className="rounded-lg bg-[#121212] p-4 flex-1 border-[1px] border-[#504E4E] space-y-10">
              {item.phraseList?.map((ite) => {
                return (
                  <div key={ite.phrase}>
                    <p className=" text-sm text-[#acacac]">
                      {"<"}
                      <span className="text-[#e5431a]">{item.model}</span>
                      {` #GAME_${numberToRoman(Number(gameData._id))} #ROUND_${
                        ite.phrase
                      } />`}
                    </p>
                    <ChatMessageItem
                      content={ite.content}
                      reasoning={ite.reasoning}
                    />
                  </div>
                );
              })}
              {item.phraseList?.length === 0 && (
                <RotateRightIcon className="animate-spin" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
