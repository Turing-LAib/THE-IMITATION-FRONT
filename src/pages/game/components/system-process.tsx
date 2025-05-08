import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { GameListItem } from "@/services/getGame";
import { GameSystemMessage, getGameSystemMessage } from "@/services/getChat";
import { PlayerListItem } from "@/services/getPlayer";
type SystemProcessProps = {
  gameData: GameListItem;
  socketSystem: GameSystemMessage;
  playerList: PlayerListItem[];
};
export default function SystemProcess({
  gameData,
  socketSystem,
  playerList,
}: SystemProcessProps) {
  const [messages, setMessages] = useState<GameSystemMessage[]>([]);
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
    console.log("socketSystem:", socketSystem);
    if (socketSystem) {
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, socketSystem] : [socketSystem]
      );
    }
  }, [socketSystem]);

  useEffect(() => {
    if (!gameData.startTime) return;
    const updateTimer = () => {
      let time: string;
      if (!socketSystem?.object?.startTime?.toString()) {
        time = gameData.startTime;
      } else {
        time = socketSystem.object.startTime?.toString();
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
  }, [gameData.startTime, socketSystem?.object?.startTime?.toString()]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    getGameSystemMessage(gameData._id).then((res) => {
      setMessages(res);
    });
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
        {messages?.map((item, index) => {
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
                  <span className="text-[#63a11a]">{item.object.period}</span>
                </p>
              )}
              {item.type === 3 && (
                <p className="flex items-start terminal-line animate-fadeIn">
                  <span className=" mr-2">[System]</span>
                  <span>Voting results</span>
                </p>
              )}
              {item.type === 3 && (
                <p className="flex items-start terminal-line animate-fadeIn">
                  <span className=" mr-2">[System]</span>
                  {item.object &&
                    Object.entries(item.object).length > 0 &&
                    Object.entries(item.object).map(([key, value]) => (
                      <span key={key} className="text-[#63a11a]">
                        {playerList?.find((ite) => ite._id === Number(key))
                          ?.name || key}
                        : {value},{" "}
                      </span>
                    ))}
                </p>
              )}
              {item.type === 2 && (
                <p className="flex items-start terminal-line animate-fadeIn">
                  <span className=" mr-2">[System]</span>
                  <span className="text-[#63a11a]">{item.object.name} Die</span>
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
                (socketSystem
                  ? socketSystem.object.totalSecond
                  : gameData.totalSecond)) *
              100 *
              -1
            }%)`,
          }}
        />
      </div>
    </div>
  );
}
