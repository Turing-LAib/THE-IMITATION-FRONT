import { getGameChat } from "@/services/getChat";
import { GameListItem } from "@/services/getGame";
import { PlayerListItem } from "@/services/getPlayer";
import { numberToRoman } from "@/utils/format";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
type chatMessageProps = {
  gameData: GameListItem;
  playerList: PlayerListItem[];
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
          phraseList: groupByPhrase[item._id.toString()],
        };
      });
      setAiList(list);
    });
  }, [playerList, gameData._id, gameData.phrase, gameData.round]);
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
                    <div className=" text-sm mt-1 bg-[#1A1A1A] p-3 rounded-lg text-[#acacac]">
                      <p>{"<Reasoning>"}</p>
                      <p className="whitespace-pre-wrap">
                        {ite.reasoning || "This model is not supported"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[#63a11a] mb-4">{"<Message>"}</p>
                      {/* <p className="whitespace-pre-wrap">{ite.content}</p> */}
                      <Markdown>{ite.content}</Markdown>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
