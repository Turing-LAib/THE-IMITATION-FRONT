import Typewriter from "@/components/typewriter";
import { GameChatResponse } from "@/services/getChat";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
type chatMessageProps = {
  chatMessageList: (GameChatResponse & {
    name: string;
    img: string;
  })[];
};
const ChatMessageItem = ({
  content,
  reasoning,
  playerId,
  onComplete,
}: {
  reasoning: string;
  content: string;
  playerId: number;
  onComplete: () => void;
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
          <Typewriter
            text={reasoning || "This model is not supported"}
            onComplete={() => setIsReasoning(true)}
          />
        </AccordionDetails>
      </Accordion>
      {isReasoning && (
        <div className="mt-4">
          <p className="text-[#63a11a] mb-4">{"<Message>"}</p>
          <Typewriter text={content} onComplete={onComplete} />
        </div>
      )}
    </>
  );
};

export default function ChatMessage({ chatMessageList }: chatMessageProps) {
  const [chatIndex, setChatIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("chatIndex:", chatIndex);
    console.log("chatMessageList:", chatMessageList);
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
      className="mt-7 space-y-6 h-[calc(100vh-390px)] overflow-y-auto custom-scrollbar"
    >
      {chatMessage.map((item, index) => {
        return (
          <div className="flex gap-x-4 " key={index}>
            {[9999, 9998].includes(item.playerId) ? (
              <div className="w-[60px]" />
            ) : (
              <img
                className="w-[60px] h-[60px] rounded-sm"
                src={item.img || "/img/ai.png"}
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
                {item.content && (
                  <Typewriter
                    text={item.content}
                    onComplete={() => {
                      setChatIndex(index + 1);
                    }}
                  />
                )}
              </div>
            ) : (
              <div
                className="rounded-lg p-4 flex-1"
                style={{ background: getBg(item.playerId) }}
              >
                <p className=" text-sm mb-2 text-[#acacac]">
                  {"<"}
                  <span style={{ color: getTitleColor(item.playerId) }}>
                    {item.name}
                  </span>
                  {` ${dayjs(item.time).format("HH:mm")} />`}
                </p>
                <ChatMessageItem
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
