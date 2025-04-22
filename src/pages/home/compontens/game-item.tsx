import { cn } from "@/utils/cn";
import { numberToRoman } from "@/utils/format";

export default function GameItem({ item }: any) {
  return (
    <div
      className={cn(
        "group",
        item.isActive ? "cursor-pointer" : "cursor-not-allowed opacity-70"
      )}
    >
      <div>GAME-{numberToRoman(Number(item.id))}</div>
      <div className="w-full overflow-hidden relative ">
        <img
          className="w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={item.img}
          alt=""
        />
        <div className="w-[120px] absolute left-5 bottom-5 text-2xl">
          {item.title}
        </div>
      </div>
    </div>
  );
}
