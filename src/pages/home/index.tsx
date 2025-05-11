import Laryout from "@/components/layout";
import LoadingVideo from "@/components/loading-video";
import { useEffect, useState } from "react";
import GameItem from "./compontens/game-item";
import HomeTextAnimation from "@/components/home-text-animation";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Footer from "@/components/footer";
import { GameListItem, getGameList } from "@/services/getGame";
export default function Home() {
  const [isOver, setIsOver] = useState(false);
  const navigate = useNavigate();
  const [gameList, setGameList] = useState<GameListItem[]>([]);
  useEffect(() => {
    getGameList().then((res) => {
      setGameList(res);
    });
  }, []);
  return (
    <div>
      {isOver ? (
        <LoadingVideo setIsOver={setIsOver} />
      ) : (
        <Laryout>
          <div className="text-white pt-20 pb-10 h-[calc(100vh-140px)] overflow-y-auto">
            <div className="flex flex-col items-center font-light relative">
              <div className="relative w-[270px] h-[270px] group cursor-pointer">
                <img
                  className="w-full h-full absolute top-0 left-0 group-hover:opacity-0 transition-opacity duration-500"
                  src="/img/homeLogo.png"
                  alt=""
                />
                <img
                  className="w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  src="/img/home-variant.png"
                  alt=""
                />
              </div>
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
                    key={item._id}
                    item={item}
                    onClick={() => {
                      if (item.phrase < 6) {
                        navigate(`/game/${item._id}`);
                      } else {
                        toast.warning("Coming Soon");
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
          <Footer />
        </Laryout>
      )}
    </div>
  );
}
