import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-[calc(100%-80px)] text-white fixed flex justify-between items-center top-16 left-10 rounded-full border-[1px] border-[#504E4E] px-10 py-5">
      <span className="font-light text-[20px]">THE IMITATION</span>
      <div className="flex items-center gap-x-10">
        <Link to={"/"} className="hover:opacity-70 transition-all">
          Home
        </Link>
        <Link to={"/about"} className="hover:opacity-70 transition-all">
          About
        </Link>
        <Link
          to={"https://github.com/Turing-LAib"}
          target="_blank"
          className="hover:opacity-70 transition-all"
        >
          GitHub
        </Link>
        <button className="border-[1px] border-[#ACACAC] bg-black rounded-full px-5 py-2 cursor-pointer hover:opacity-70 transition-all">
          CONNECT WALLET
        </button>
      </div>
    </div>
  );
}
