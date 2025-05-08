import { GameSystemMessage } from "@/services/getChat";
import { GameListItem } from "@/services/getGame";
import { PlayerListItem } from "@/services/getPlayer";
import { getVoteInfo, submitVote, VoteInfo } from "@/services/vote";
import { cn } from "@/utils/cn";
import { numberToRoman } from "@/utils/format";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type liveVoteProps = {
  gameData: GameListItem;
  playerList: PlayerListItem[];
};
export default function LiveVote({ gameData, playerList }: liveVoteProps) {
  const [voteId, setVoteId] = useState<number>();
  const { primaryWallet } = useDynamicContext();
  const [voteInfo, setVoteInfo] = useState<VoteInfo | null>(null);
  const [voteLoading, setVoteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (primaryWallet?.address) {
      getVoteInfo(primaryWallet?.address, gameData._id).then((res) => {
        setVoteInfo(res);
      });
    }
  }, [primaryWallet?.address]);
  const handleVote = async () => {
    if (!primaryWallet?.address) {
      return;
    }
    setVoteLoading(true);
    const res = await submitVote(
      primaryWallet?.address,
      gameData._id,
      voteId || 0
    );
    if (res.data.result) {
      toast.success("Vote Success");
    } else {
      toast.error(res.msg);
    }
    setVoteLoading(false);
  };
  return (
    <div className="bg-linear-to-r from-[#0C0C0C] to-[#171717] rounded-[27px] p-7 mt-7">
      <div className="bg-[#1A1A1A] rounded-2xl p-3 mb-5">
        <p className="font-bold text-3xl">Live Vote</p>
        <p className="text-[#ACACAC]">
          GAME - {numberToRoman(Number(gameData._id))}
        </p>
      </div>
      <div className="space-y-2">
        {playerList.map((item) => {
          return (
            <div
              className={cn(
                "bg-[#1A1A1A] rounded-2xl p-3 flex items-center w-full",
                item.status === 1 ? "cursor-pointer" : "cursor-not-allowed",
                item._id === voteId
                  ? "border-[1px] border-[#8BE421]"
                  : "border-[1px] border-[rgba(0,0,0,0)]"
              )}
              key={item._id}
              onClick={() => {
                if (item.status !== 1) {
                  return;
                }
                setVoteId(item._id);
              }}
            >
              <img className="w-9 h-9" src={item.img || "/img/ai.png"} alt="" />
              <div className="ml-2 text-[#ACACAC] text-sm">
                <p>
                  {item.name}{" "}
                  <span
                    className={cn(
                      "ml-1",
                      item.status === 1 ? "text-[#8be421]" : ""
                    )}
                  >
                    {item.status === 1 ? "ALIVE" : "DEAD"}
                  </span>
                </p>
                <p>{item.model}</p>
              </div>
              <div
                className={cn(
                  "rounded-lg px-3 py-1 ml-auto border-[1px] border-[#ACACAC]",
                  item.status === 1
                    ? voteId === item._id
                      ? "bg-[#63A11A]"
                      : "bg-black"
                    : " bg-[#504E4E]"
                )}
              >
                Select
              </div>
            </div>
          );
        })}
      </div>
      <Button
        variant="contained"
        disabled={!Boolean(voteId)}
        loading={voteLoading}
        sx={{
          mt: 2,
          width: "100%",
          py: 1.5,
          fontSize: "1.125rem",
          textTransform: "none",
          borderRadius: 2,
          border: "1px solid #ACACAC",
          backgroundColor: voteId ? "#8BE421" : "#0C0C0C",
          color: voteId ? "#000000" : "#FFFFFF",
          height: "48px",
          "&:hover": {
            backgroundColor: voteId ? "#63A11A" : "#0C0C0C",
            opacity: 0.8,
          },
          "&.Mui-disabled": {
            backgroundColor: "#0C0C0C",
            color: "#FFFFFF",
            border: "1px solid #ACACAC",
            cursor: "not-allowed",
          },
          "& .MuiCircularProgress-indeterminate": {
            color: "white",
          },
        }}
        onClick={handleVote}
      >
        {!voteLoading && "VOTE"}
      </Button>
    </div>
  );
}
