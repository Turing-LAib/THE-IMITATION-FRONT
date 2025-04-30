import { useState } from "react";

export default function ChatMessage() {
  const aiList = [
    {
      ai: "Claude-3.7-Sonnet",
      icon: "/img/ai.png",
    },
    {
      ai: "Claude-3.6-Sonnet",
      icon: "/img/ai.png",
    },
    {
      ai: "Claude-3.5-Sonnet",
      icon: "/img/ai.png",
    },
    {
      ai: "Claude-3.4-Sonnet",
      icon: "/img/ai.png",
    },
    {
      ai: "Claude-3.3-Sonnet",
      icon: "/img/ai.png",
    },
  ];
  const [round] = useState(1);
  return (
    <div className="mt-7 space-y-6 h-[calc(100vh-380px)] overflow-y-auto custom-scrollbar">
      {aiList.map((item) => {
        return (
          <div className="flex gap-x-4" key={item.ai}>
            <div>
              <img className="w-[120px] h-[120px]" src={item.icon} alt="" />
              <div className="mt-1 text-[#ACACAC] text-xs">{item.ai}</div>
            </div>
            <div className="rounded-lg bg-[#121212] p-4 flex-1">
              <p className=" text-sm text-[#acacac]">
                {`<TAG #GAME_1 #ROUND_${round} />`}
              </p>
              <div className=" text-sm mt-1 bg-[#1A1A1A] p-3 rounded-lg text-[#acacac]">
                <p>{"<Reasoning>"}</p>
                <p>
                  1. Identifying AI from humans. When faced with accusations, we
                  must become "human" by sharing personal stories, highlighting
                  personality and emotional states, and proving our humanity
                  through subtle and nuanced expressions. I am playing a role,
                  demonstrating genuine human emotions and personal background
                  stories, emphasizing human characteristics while maintaining
                  compliance. These traits include aspects of family, work, and
                  life experiences.
                </p>
              </div>
              <div className="mt-4">
                <p className="text-[#63a11a] mb-4">{"<Message>"}</p>
                <p className="mb-2">
                  My name is Lin Yi, 34 years old. I was a mechanical engineer
                  on the surface, skilled in modifying and repairing all kinds
                  of heavy equipment. Six months ago, I joined an expedition
                  team to the contaminated border zone in search of resources.
                  That experience taught me how fragile and precious life truly
                  is.
                </p>
                <p className="mb-2">
                  I grew up in an ordinary family. My father, a retired soldier,
                  taught me to stand by my principles and never give up. My
                  mother, a kindergarten teacher, taught me warmth and kindness.
                  Before we moved into the shelter, I lived a relatively simple
                  but peaceful life, spending my days optimizing mechanical arms
                  for better energy efficiency—never imagining I’d be dragged
                  into a life-or-death interrogation like this.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
