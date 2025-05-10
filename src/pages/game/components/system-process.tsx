import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { GameSystemMessage } from "@/services/getChat";
import { PlayerListItem } from "@/services/getPlayer";
type SystemProcessProps = {
  systemMessage: GameSystemMessage[];
  playerList: PlayerListItem[];
};
export default function SystemProcess({
  systemMessage,
  playerList,
}: SystemProcessProps) {
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
    console.log("systemMessage:", systemMessage);
    const updateTimer = () => {
      let time = "";
      if (systemMessage[systemMessage.length - 1]?.type === 1) {
        time = String(
          systemMessage[systemMessage.length - 1]?.object?.startTime || ""
        );
      }
      const result = calculateTimeDifference(time);
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
  }, [systemMessage.length]);
  useEffect(() => {
    scrollToBottom();
  }, [systemMessage.length]);
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
    <div>
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
        {systemMessage.map((item, index) => {
          return (
            <div key={index} className=" text-lg">
              {index === 0 && (
                <p className="terminal-line animate-fadeIn">
                  System is initializing suspect profiles
                </p>
              )}
              {item.type === 1 && (
                <p className="flex items-start terminal-line animate-fadeIn">
                  <span className=" mr-2">[System]</span>
                  <span className="text-[#63a11a]">
                    Round {item.object.round} Interrogation Begins
                  </span>
                </p>
              )}
              {item.type === 1 && (
                <p className="flex items-start terminal-line animate-fadeIn">
                  <span className=" mr-2">
                    [System] [phase{item.object.phrase}]
                  </span>
                  <span className="text-[#ff8e14]">{item.object.period}</span>
                </p>
              )}
              {item.type === 3 && (
                <p className="flex items-start terminal-line animate-fadeIn text-[#9747FF]">
                  <span className=" mr-2">[System]</span>
                  <span>Voting results</span>
                </p>
              )}
              {item.type === 3 && (
                <p className="flex items-start terminal-line animate-fadeIn text-[#9747FF]">
                  <span className=" mr-2">[System]</span>
                  {item.object &&
                    Object.entries(item.object).length > 0 &&
                    Object.entries(item.object).map(([key, value]) => (
                      <span key={key}>
                        {playerList?.find((ite) => ite._id === Number(key))
                          ?.name || key}
                        {` received ${value} votes.`}
                      </span>
                    ))}
                </p>
              )}
              {item.type === 2 && (
                <p className="flex items-start terminal-line animate-fadeIn text-[#E5431A]">
                  <span className=" mr-2">[System]</span>
                  <span>{item.object.name} Die</span>
                </p>
              )}
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
              (timeLeft.secs /
                (systemMessage[systemMessage.length - 1]?.object?.totalSecond ||
                  0)) *
              100 *
              -1
            }%)`,
          }}
        />
      </div>
    </div>
  );
}
