import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="mt-10 w-full flex justify-between text-white">
      <span>XXXX</span>
      <div className="flex items-center gap-x-5">
        <span>XXXX</span>
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
  );
}
