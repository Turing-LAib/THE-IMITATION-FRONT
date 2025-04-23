import Layout from "@/components/layout";
import Intro from "./components/intro";
import LiveVote from "./components/live-vote";
import SystemProcess from "./components/system-process";

export default function GamePage() {
  return (
    <Layout>
      <div className="text-white grid grid-cols-4 gap-8">
        <div>
          <Intro />
          <LiveVote />
        </div>
        <div className="col-span-3">
          <SystemProcess />
        </div>
      </div>
    </Layout>
  );
}
