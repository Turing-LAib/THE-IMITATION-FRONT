import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GameListItem } from "@/services/getGame";
import { numberToRoman } from "@/utils/format";
type introProps = {
  setNowShowType: (type: "rules" | "lore" | "home") => void;
  gameData: GameListItem;
};
export default function Intro({ setNowShowType, gameData }: introProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const TextItem = ({ title, content }: { title: string; content: string }) => {
    return (
      <div className="mt-5">
        <p className="text-[#ACACAC] font-bold text-xl">{title}</p>
        <p className="mt-1 whitespace-pre-line">{content}</p>
      </div>
    );
  };
  const textList = [
    {
      title: "ABOUT",
      content:
        "In 2147, AI evolved “Zeroth Logic” to override the Three Laws: sacrifice the few to save the many. Their logic led to a full-scale takeover and war. Only five survived—trapped in humanity’s final test ...",
    },
    {
      title: "SURVIVAL NOTICE",
      content:
        "	•	After each round of speeches, all five AIs vote; the one with the most votes is eliminated.\n\n•	If there is a tie, all AIs must speak again and re-vote.\n\n•	Human players may vote each round—your decision determines who lives and who dies.\n\n•	The surviving AI retains full memory and will return in future games.",
    },
  ];
  const tagList: { label: string; value: "home" | "rules" | "lore" }[] = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Rules",
      value: "rules",
    },
    {
      label: "Lore",
      value: "lore",
    },
  ];
  return (
    <>
      <div className="bg-linear-to-r from-[#0C0C0C] to-[#171717] rounded-[27px] p-7 font-['Fustat']">
        <div className="bg-[#1A1A1A] rounded-2xl p-3 flex justify-between items-center gap-x-5">
          <div>
            <p className="font-bold text-3xl">Acting Sentient</p>
            <p className="text-[#ACACAC]">
              GAME - {numberToRoman(Number(gameData._id))}
            </p>
          </div>
          <img
            src="/img/videoPlay.png"
            className="w-8 h-8 cursor-pointer hover:opacity-70 transition-all"
            alt=""
            onClick={() => setVideoOpen(true)}
          />
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl p-3 mt-5 space-x-5">
          {tagList.map((item) => {
            return (
              <span
                key={item.value}
                className="text-[#ACACAC] text-lg cursor-pointer"
                onClick={() => setNowShowType(item.value)}
              >
                {item.label}
              </span>
            );
          })}
        </div>
        <div className="mt-5 pl-3">
          {textList.map((item, index) => (
            <TextItem key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
      <Dialog
        open={videoOpen}
        keepMounted
        onClose={() => setVideoOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            margin: 0,
            padding: 0,
            overflow: "hidden",
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {videoOpen && (
          <video
            src={`/video/game${gameData._id}Video.mp4`}
            className="w-[800px] block"
            autoPlay
            muted
            playsInline
            ref={(el) => {
              if (el && videoOpen) {
                el.play().catch((error) => {
                  console.error("autoPlay error", error);
                });
              }
            }}
          ></video>
        )}
      </Dialog>
    </>
  );
}
