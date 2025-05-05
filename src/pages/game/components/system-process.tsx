import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { GameListItem } from "@/services/getGame";
const systemMessages = [
  {
    message: "System is initializing suspect profiles…",
    highlight: false,
  },
  {
    message: "Round 1 Interrogation Begins",
    highlight: true,
  },
  {
    message: "Suspect Self-Introductions",
    highlight: true,
  },
  {
    message:
      "Each suspect will take turns introducing themselves, attempting to prove they are truly human…",
    highlight: false,
  },
  {
    message: "Analyzing suspect response patterns...",
    highlight: false,
  },
  {
    message: "Detecting potential AI behaviors...",
    highlight: false,
  },
  {
    message: "Security protocols engaged",
    highlight: true,
  },
  {
    message: "Preparing for first elimination round",
    highlight: true,
  },
];
type SystemProcessProps = {
  gameData: GameListItem;
};
export default function SystemProcess({ gameData }: SystemProcessProps) {
  const [messages, setMessages] = useState<number[]>([0]);
  const [timeLeft, setTimeLeft] = useState<{ time: string; secs: number }>({
    time: "",
    secs: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const updateTimer = () => {
      const result = calculateTimeDifference(gameData.startTime);
      setTimeLeft(result);
      return result.secs > 0;
    };

    if (updateTimer()) {
      const interval = setInterval(() => {
        if (!updateTimer()) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameData.startTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length >= systemMessages.length) {
        clearInterval(interval);
      }
      setMessages((prev) => {
        if (prev.length < systemMessages.length) {
          return [...prev, prev.length];
        } else {
          return prev;
        }
      });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const calculateTimeDifference = (targetTime: string) => {
    const now = dayjs();
    const target = dayjs(targetTime);
    const diffInSeconds = target.diff(now, "second");

    if (diffInSeconds <= 0) {
      return {
        time: `0 DAYS : 0 HOURS : 0 MINS : 0 SECS`,
        secs: 0,
      };
    }

    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return {
      time: `${days} DAYS : ${hours} HOURS : ${minutes} MINS : ${seconds} SECS`,
      secs: diffInSeconds,
    };
  };
  return (
    <div className="">
      <div className="bg-[#1A1A1A] p-5 text-center rounded-full text-[#ACACAC]">
        {timeLeft.secs > 0 ? (
          <>
            <span>{">>> Confidential Security Protocol Activated in "}</span>
            <span className="text-[#8be421] font-bold">{timeLeft.time}</span>
            <span>{" <<<"}</span>
          </>
        ) : (
          <span>{"Voting Phase Activated"}</span>
        )}
      </div>
      <div className="h-[120px] mt-5 mb-5 overflow-y-auto custom-scrollbar terminal-style">
        {messages.map((messageIndex) => {
          const item = systemMessages[messageIndex];
          return (
            <div
              key={messageIndex}
              className="terminal-line animate-fadeIn text-lg"
            >
              <p className="flex items-start">
                <span className="text-[#63a11a] mr-2">[System]</span>
                {item.highlight ? (
                  <span className="text-[#8be421]">{item.message}</span>
                ) : (
                  <span>{item.message}</span>
                )}
              </p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-7 bg-[#504E4E] w-full overflow-x-hidden h-2 relative text-2xl text-black rounded-lg">
        <div
          className="bg-[#8BE421] h-full w-full transition-all duration-1000 ease-in-out"
          style={{
            transform: `translateX(${
              (timeLeft.secs / gameData.totalSecond) * 100 * -1
            }%)`,
          }}
        />
      </div>
    </div>
  );
}
