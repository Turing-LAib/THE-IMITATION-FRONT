import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { GameSystemMessage } from "@/services/getChat";
import { PlayerListItem } from "@/services/getPlayer";
type SystemProcessProps = {
  systemMessage: GameSystemMessage[];
  playerList: PlayerListItem[];
  isInit: boolean;
  isVoting: boolean;
};
export default function SystemProcess({
  systemMessage,
  playerList,
  isInit,
  isVoting,
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
      if ([1, 4].includes(systemMessage[systemMessage.length - 1]?.type)) {
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
      {isInit ? (
        <div className="bg-[#1A1A1A] px-5 py-2 text-center rounded-full text-[#ACACAC]">
          <span>{">>>Livestream Protocol Activated in "}</span>
          <span className="text-[#8be421] font-bold">{timeLeft.time}</span>
          <span>{" <<<"}</span>
        </div>
      ) : isVoting ? (
        <div className="bg-[#8BE421] px-5 py-2 text-center rounded-full text-black">
          <span>{">>> Voting Phase Activated,ends in "}</span>
          <span className=" font-bold">
            {timeLeft.time.replace(/\d+ DAYS : \d+ HOURS : /, "")}
          </span>
          <span>{" <<<"}</span>
        </div>
      ) : (
        <div className="bg-[#1A1A1A] px-5 py-2 text-center rounded-full text-[#ACACAC]">
          <span>{">>> Voting Phase Not Activated <<<"}</span>
        </div>
      )}
      <div className="h-[90px] mt-2 mb-2 overflow-y-auto custom-scrollbar terminal-style">
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
                    Round {item.object.phrase === 0 ? 1 : item.object.phrase}{" "}
                    Interrogation Begins
                  </span>
                </p>
              )}
              {item.type === 1 && (
                <p className="flex items-start terminal-line animate-fadeIn">
                  <span className=" mr-2">[System]</span>
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
                  <span>{item.object.name} Dead</span>
                </p>
              )}
              {item.type === 4 && (
                <p className="flex items-start terminal-line animate-fadeIn text-[#9747FF]">
                  <span>{String(item.object?.content || "")}</span>
                </p>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className=" bg-[#504E4E] w-full overflow-x-hidden h-2 relative text-2xl text-black rounded-lg">
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
