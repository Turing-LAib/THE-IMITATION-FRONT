import { useState } from "react";

export default function ProgressBar() {
  const sumRound = 5;
  const [round] = useState(1);
  return (
    <div className="mt-7 bg-white w-full overflow-x-hidden h-12 relative text-2xl text-black rounded-lg">
      <div
        className="bg-[#8BE421] h-full w-full transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateX(${
            (100 / sumRound) * (sumRound - round) * -1
          }%)`,
        }}
      ></div>
      <span className="absolute left-1/2 top-1/2 -translate-1/2">
        ROUND {round} -SELF-INTRO
      </span>
    </div>
  );
}
