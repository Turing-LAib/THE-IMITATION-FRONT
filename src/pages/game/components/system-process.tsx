import { useEffect, useState, useRef } from "react";

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

export default function SystemProcess() {
  const [messages, setMessages] = useState<number[]>([0]);
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
  return (
    <div className="">
      <div className="bg-[#1A1A1A] p-5 text-center rounded-full text-[#ACACAC]">
        {">>> Confidential Security Protocol Activated in "}
        <span className="text-[#8be421] font-bold">{`${5} DAYS : ${10} HOURS : ${5} MINS : ${10} SECS`}</span>
        {" <<<"}
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
    </div>
  );
}
