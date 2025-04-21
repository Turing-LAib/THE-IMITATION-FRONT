import Laryout from "@/components/laryout";
import LoadingVideo from "@/components/loading-video";
import { useState } from "react";

export default function Home() {
  const [isOver, setIsOver] = useState(true);
  return (
    <div>
      {isOver ? (
        <LoadingVideo setIsOver={setIsOver} />
      ) : (
        <Laryout>
          <div className="text-white">home</div>
        </Laryout>
      )}
    </div>
  );
}
