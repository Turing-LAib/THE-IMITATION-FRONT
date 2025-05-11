import Typewriter from "@/components/typewriter";
import { GameChatResponse } from "@/services/getChat";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { BASE_URL } from "@/constants/config";
type chatMessageProps = {
  chatMessageList: (GameChatResponse & {
    name: string;
    img: string;
    isSocket: boolean;
    model: string;
  })[];
};
const ChatMessageItem = ({
  content,
  reasoning,
  playerId,
  onComplete,
  isSocket,
}: {
  reasoning: string;
  content: string;
  playerId: number;
  onComplete: () => void;
  isSocket: boolean;
}) => {
  const [isReasoning, setIsReasoning] = useState(false);
  const getReasoningBg = (playerId: number) => {
    switch (playerId) {
      case 1:
        return "#150000";
      case 2:
        return "#1E1400";
      case 3:
        return "#111F00";
      case 4:
        return "#00231F";
      case 5:
        return "#150025";
      default:
        return "#150025";
    }
  };
  return (
    <>
      <Accordion
        sx={{
          color: "#acacac",
          background: getReasoningBg(playerId),
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-[#acacac]" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p>{"<Reasoning>"}</p>
        </AccordionSummary>
        <AccordionDetails>
          {isSocket ? (
            <Typewriter
              text={reasoning || "This model is not supported"}
              onComplete={() => setIsReasoning(true)}
            />
          ) : (
            <Markdown>{reasoning || "This model is not supported"}</Markdown>
          )}
        </AccordionDetails>
      </Accordion>
      {isSocket ? (
        isReasoning && (
          <div className="mt-4">
            <p className="text-white mb-4">{"<Message>"}</p>
            <Typewriter text={content} onComplete={onComplete} />
          </div>
        )
      ) : (
        <div className="mt-4">
          <p className="text-white mb-4">{"<Message>"}</p>
          <Markdown>{content}</Markdown>
        </div>
      )}
    </>
  );
};

export default function ChatMessage({ chatMessageList }: chatMessageProps) {
  const [chatIndex, setChatIndex] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("chatIndex:", chatIndex);
    console.log("chatMessageList:", chatMessageList);
    if (chatMessageList.filter((item) => item.isSocket)?.length === 0) {
      setChatIndex(chatMessageList.length);
    }
    scrollToBottom();
  }, [chatIndex, chatMessageList.length]);

  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;
    const container = messagesEndRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  };
  const chatMessage = useMemo(() => {
    return chatMessageList.slice(0, chatIndex + 1);
  }, [chatIndex, chatMessageList]);
  const getTitleColor = (playerId: number) => {
    switch (playerId) {
      case 1:
        return "#E5431A";
      case 2:
        return "#DFB600";
      case 3:
        return "#00DF08";
      case 4:
        return "#13BFB0";
      case 5:
        return "#9310BF";
      case 9999:
        return "#D7C972";
      case 9998:
        return "#E5431A";
      default:
        return "#E5431A";
    }
  };
  const getBg = (playerId: number) => {
    switch (playerId) {
      case 1:
        return "#280000";
      case 2:
        return "#342200";
      case 3:
        return "#274800";
      case 4:
        return "#003530";
      case 5:
        return "#1C0032";
      default:
        return "#0F0F0F";
    }
  };

  return (
    <div
      ref={messagesEndRef}
      className="mt-3 space-y-6 h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar"
    >
      {chatMessage.map((item, index) => {
        return (
          <div className="flex gap-x-4 " key={index}>
            {[9999, 9998].includes(item.playerId) ? (
              <div className="w-10" />
            ) : (
              <img
                className="w-10 h-10 rounded-sm"
                src={item.img ? BASE_URL + item.img : "/img/ai.png"}
                alt=""
              />
            )}
            {[9999, 9998].includes(item.playerId) ? (
              <div
                className="rounded-lg p-4 flex-1"
                style={{
                  background: getBg(item.playerId),
                  color: getTitleColor(item.playerId),
                }}
              >
                {item.content &&
                  (item.isSocket ? (
                    <Typewriter
                      text={item.content}
                      onComplete={() => {
                        setChatIndex(index + 1);
                      }}
                    />
                  ) : (
                    <Markdown>{item.content}</Markdown>
                  ))}
              </div>
            ) : (
              <div
                className="rounded-lg p-4 flex-1"
                style={{ background: getBg(item.playerId) }}
              >
                <p className=" text-sm mb-2 text-white">
                  {"<"}

                  {item.name}
                  <span
                    className="mx-2"
                    style={{ color: getTitleColor(item.playerId) }}
                  >
                    {item.model}
                  </span>
                  {` ${dayjs(item.time).format("HH:mm")} />`}
                </p>
                <ChatMessageItem
                  isSocket={item.isSocket}
                  content={item.content}
                  reasoning={item.reasoning}
                  playerId={item.playerId}
                  onComplete={() => {
                    setChatIndex(index + 1);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
