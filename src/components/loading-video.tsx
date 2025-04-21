import { useEffect, useState } from "react";
type LoadingVideoProps = {
  setIsOver: (isOver: boolean) => void;
};
export default function LoadingVideo({ setIsOver }: LoadingVideoProps) {
  const handleEnter = () => {
    setIsOver(false);
  };
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleEnter();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);
  useEffect(() => {
    const stepTime = 10;
    const step = 100 / (3000 / stepTime);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          handleEnter();
          return 100;
        } else {
          return prev + step;
        }
      });
    }, stepTime);
    return () => clearInterval(timer);
  }, [handleEnter]);
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <video
        className="absolute left-1/2 top-1/2 h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 transform object-cover transition-opacity duration-1000 opacity-100"
        autoPlay
        playsInline
        muted
        preload="auto"
      >
        <source src="/img/loading.webm" type="video/webm" />
      </video>
      <div className="absolute bottom-10 flex flex-col items-center left-1/2 -translate-x-1/2">
        <button
          onClick={handleEnter}
          className="bg-white/20 text-white rounded-full px-4 py-2 cursor-pointer hover:opacity-70 transition-all"
        >
          ENTER
        </button>
        <div className="mt-4 w-[200px] bg-white/20 h-1 rounded-full relative">
          <div
            className=" bg-white left-0 top-0 h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
