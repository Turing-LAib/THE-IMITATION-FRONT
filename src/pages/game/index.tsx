import Layout from "@/components/layout";
import Intro from "./components/intro";
import LiveVote from "./components/live-vote";
import SystemProcess from "./components/system-process";
import ProgressBar from "./components/progress-bar";
import ChatMessage from "./components/chat-message";
import Rules from "./components/rules";
import { useState } from "react";
import Lore from "./components/lore";

export default function GamePage() {
  const [nowShowType, setNowShowType] = useState<"rules" | "lore" | "home">(
    "home"
  );
  return (
    <Layout>
      <div className="text-white grid grid-cols-12 gap-8">
        <div className="col-span-4 h-[calc(100vh-170px)] overflow-auto hide-scrollbar">
          <Intro setNowShowType={setNowShowType} />
          <LiveVote />
        </div>
        <div className="col-span-8">
          {nowShowType === "home" && (
            <>
              <SystemProcess />
              <ProgressBar />
              <ChatMessage />
            </>
          )}
          {nowShowType === "rules" && <Rules />}
          {nowShowType === "lore" && <Lore />}
        </div>
      </div>
    </Layout>
  );
}
