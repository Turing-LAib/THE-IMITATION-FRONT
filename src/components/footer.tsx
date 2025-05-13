import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="fixed z-20 bottom-3 left-0 w-full">
      <div className=" w-[calc(100%-80px)] max-w-[1600px] m-auto  flex justify-between text-white">
        <span></span>
        <div className="flex items-center gap-x-5">
          <span></span>
          <Link
            to="https://github.com/Turing-LAib"
            className="hover:opacity-70 transition-all"
            target="_blank"
          >
            <img src="/svg/github.svg" alt="" />
          </Link>
          <Link
            to="https://x.com/Theimitationai"
            className="hover:opacity-70 transition-all"
            target="_blank"
          >
            <img src="/svg/twitter.svg" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
