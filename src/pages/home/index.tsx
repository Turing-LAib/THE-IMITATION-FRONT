import Laryout from "@/components/layout";
import LoadingVideo from "@/components/loading-video";
import { useState } from "react";
import GameItem from "./compontens/game-item";
import HomeTextAnimation from "@/components/home-text-animation";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export default function Home() {
  const [isOver, setIsOver] = useState(false);
  const navigate = useNavigate();
  const gameList = [
    {
      id: "1",
      title: "Acting Sentient",
      img: "/img/game1.png",
      isActive: true,
    },
    {
      id: "2",
      title: "Acting Sentient",
      img: "/img/game1.png",
      isActive: false,
    },
  ];
  return (
    <div>
      {isOver ? (
        <LoadingVideo setIsOver={setIsOver} />
      ) : (
        <Laryout>
          <div className="text-white pt-20">
            <div className="flex flex-col items-center font-light relative">
              <img
                className="w-[270px] h-[270px]"
                src="/img/homeLogo.png"
                alt=""
              />
              <div className="text-center absolute top-1/2 -translate-y-1/2">
                <HomeTextAnimation
                  className="text-[#ACACAC] text-2xl"
                  text="THE IMITATION GAME"
                />
                <HomeTextAnimation className="text-5xl" text="TURING LAB" />
              </div>
            </div>
            <div className="mt-20 grid grid-cols-4 gap-10">
              {gameList.map((item) => {
                return (
                  <GameItem
                    key={item.id}
                    item={item}
                    onClick={() => {
                      if (item.isActive) {
                        navigate(`/game/${item.id}`);
                      } else {
                        toast.warning("Coming Soon");
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Laryout>
      )}
    </div>
  );
}
