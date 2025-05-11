import { useEffect, useMemo, useState } from "react";
import Header from "./header";
import HomeTextAnimation from "./home-text-animation";
import { Link } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  return innerWidth >= 768 ? (
    <div className="w-screen min-h-screen bg-linear-to-r from-[#0C0C0C] to-[#171717] pt-[75px] px-10 ">
      <div className="max-w-[1600px] m-auto">
        <Header />
        {children}
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex bg-linear-to-r from-[#0C0C0C] to-[#171717] relative">
      <div className="m-auto">
        <div className="flex flex-col items-center font-light relative text-white">
          <div className="relative w-[158px] h-[158px] group cursor-pointer">
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
              className="text-[#ACACAC]"
              text="THE IMITATION GAME"
            />
            <HomeTextAnimation className="text-3xl" text="TURING LAB" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-center">
          <img className="w-8 h-8 mr-1" src="/svg/mobileHome.svg" alt="" />
          <span className="text-[#D0D0D0]">Desktop access required</span>
        </div>
      </div>
      <div className="absolute bottom-8 flex justify-center gap-x-5 w-full">
        <Link
          to="https://github.com/Turing-LAib"
          className="hover:opacity-70 transition-all w-6 h-6"
          target="_blank"
        >
          <img src="/svg/github.svg" alt="" />
        </Link>
        <Link
          to="https://x.com/Theimitationai"
          className="hover:opacity-70 transition-all w-6 h-6"
          target="_blank"
        >
          <img src="/svg/twitter.svg" alt="" />
        </Link>
      </div>
    </div>
  );
}
