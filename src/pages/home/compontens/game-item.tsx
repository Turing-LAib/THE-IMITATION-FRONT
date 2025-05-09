import { GameListItem } from "@/services/getGame";
import { cn } from "@/utils/cn";
import { numberToRoman } from "@/utils/format";
type gameItemType = {
  item: GameListItem;
  onClick: () => void;
};
export default function GameItem({ item, onClick }: gameItemType) {
  return (
    <div
      className={cn(
        "group",
        item.phrase < 6 ? "cursor-pointer" : "cursor-not-allowed opacity-70"
      )}
      onClick={onClick}
    >
      <div>GAME-{numberToRoman(Number(item._id))}</div>
      <div className="w-full overflow-hidden relative ">
        <img
          className="w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={`/img/game${item._id}.png`}
          alt=""
        />
        <div className="w-[120px] absolute left-5 bottom-5 text-2xl">
          {item.name}
        </div>
      </div>
    </div>
  );
}
