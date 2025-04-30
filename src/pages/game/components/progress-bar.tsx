import { useState } from "react";

export default function ProgressBar() {
  const sumRound = 5;
  const [round] = useState(1);
  return (
    <div className="mt-7 bg-[#504E4E] w-full overflow-x-hidden h-2 relative text-2xl text-black rounded-lg">
      <div
        className="bg-[#8BE421] h-full w-full transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateX(${
            (100 / sumRound) * (sumRound - round) * -1
          }%)`,
        }}
      ></div>
    </div>
  );
}
