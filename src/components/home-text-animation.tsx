import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type propsType = {
  text: string;
  className: string;
};
export default function HomeTextAnimation({ text, className }: propsType) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === text.length - 1) {
          clearInterval(interval);
          return text.length - 1;
        }
        return prev + 1;
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={"relative w-max m-auto overflow-y-hidden " + className}>
      <div className="flex items-center opacity-0">
        {text.split("").map((char, index) => {
          return <span key={index}>{char === " " ? "\u00A0" : char}</span>;
        })}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-0">
        <div className="flex items-center">
          {text.split("").map((char, index) => {
            return (
              <span
                key={index}
                className={cn(
                  "transform transition-all duration-500 block h-[1.1em]",
                  {
                    "-translate-y-full": index <= activeIndex,
                  }
                )}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
        <div className="flex items-center">
          {text.split("").map((char, index) => {
            return (
              <span
                key={index}
                className={cn(
                  "transform transition-all duration-500 block h-[1.1em]",
                  {
                    "-translate-y-full": index <= activeIndex,
                  }
                )}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
