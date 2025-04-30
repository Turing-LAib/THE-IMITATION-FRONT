import { cn } from "@/utils/cn";
import { useState } from "react";
import { toast } from "sonner";

export default function LiveVote() {
  const [voteId, setVoteId] = useState<string>();
  const aiList = [
    {
      round: "Player - 1",
      ai: "Claude-3.7-Sonnet",
      isActive: true,
      icon: "/img/ai.png",
    },
    {
      round: "Player - 1",
      ai: "Claude-3.6-Sonnet",
      isActive: true,
      icon: "/img/ai.png",
    },
    {
      round: "Player - 1",
      ai: "Claude-3.5-Sonnet",
      isActive: false,
      icon: "/img/ai.png",
    },
    {
      round: "Player - 1",
      ai: "Claude-3.4-Sonnet",
      isActive: false,
      icon: "/img/ai.png",
    },
    {
      round: "Player - 1",
      ai: "Claude-3.3-Sonnet",
      isActive: true,
      icon: "/img/ai.png",
    },
  ];
  const handleVote = () => {
    toast.success(voteId);
  };
  return (
    <div className="bg-[#101010] rounded-3xl p-3 mt-7">
      <div className="bg-[#1A1A1A] rounded-2xl px-4 py-1 mb-5">
        <p className="font-bold text-3xl">Live Vote</p>
        <p className="text-[#ACACAC]">GAME - I</p>
      </div>
      <div className="space-y-2">
        {aiList.map((item) => {
          return (
            <div
              className={cn(
                "bg-[#1A1A1A] rounded-2xl px-4 py-3 flex items-center w-full",
                item.isActive ? "cursor-pointer" : "cursor-not-allowed",
                item.ai === voteId
                  ? "border-[1px] border-[#8BE421]"
                  : "border-[1px] border-[rgba(0,0,0,0)]"
              )}
              key={item.ai}
              onClick={() => {
                if (!item.isActive) {
                  return;
                }
                setVoteId(item.ai);
              }}
            >
              <img className="w-9 h-9" src={item.icon} alt="" />
              <div className="ml-2 text-[#ACACAC] text-sm">
                <p>
                  {item.round}{" "}
                  <span
                    className={cn(
                      "ml-1",
                      item.isActive ? "text-[#8be421]" : ""
                    )}
                  >
                    {item.isActive ? "ALIVE" : "DEAD"}
                  </span>
                </p>
                <p>{item.ai}</p>
              </div>
              <div
                className={cn(
                  "rounded-lg px-3 py-1 ml-auto border-[1px] border-[#ACACAC]",
                  item.isActive
                    ? voteId === item.ai
                      ? "bg-[#63A11A]"
                      : "bg-black"
                    : " bg-[#504E4E]"
                )}
              >
                Select
              </div>
            </div>
          );
        })}
      </div>
      <button
        disabled={!Boolean(voteId)}
        className={cn(
          "mt-10 w-full border-[1px] border-[#ACACAC] rounded-lg text-lg text-center py-3 hover:opacity-70 transition-all",
          Boolean(voteId)
            ? "cursor-pointer bg-[#8BE421] text-black"
            : "cursor-not-allowed bg-[#0C0C0C] text-white"
        )}
        onClick={handleVote}
      >
        VOTE
      </button>
    </div>
  );
}
