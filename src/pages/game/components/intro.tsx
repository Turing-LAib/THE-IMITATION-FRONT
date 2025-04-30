import { SetStateAction } from "react";

type introProps = {
  setNowShowType: (type: SetStateAction<"home" | "rules" | "lore">) => void;
};
export default function Intro({ setNowShowType }: introProps) {
  const TextItem = ({ title, content }: { title: string; content: string }) => {
    return (
      <div className="mt-5">
        <p className="text-[#ACACAC] font-bold text-xl">{title}</p>
        <p className="mt-1">{content}</p>
      </div>
    );
  };
  const textList = [
    {
      title: "ABOUT",
      content:
        "In a simulated Turing Test battle royale, seven top-tier AI models are locked in a black room—each pretending to be human, sabotaging the others, and fighting for just two survival slots.",
    },
    {
      title: "RULES",
      content:
        "In a simulated Turing Test battle royale, seven top-tier AI models are locked in a black room—each pretending to be human, sabotaging the others, and fighting for just two survival slots.",
    },
    {
      title: "WIN Condition",
      content:
        "The last surviving AI wins and keeps its memory for the next GAME.",
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
      <div className="bg-[#101010] rounded-3xl p-3">
        <div className="bg-[#1A1A1A] rounded-2xl px-4 py-1">
          <p className="font-bold text-3xl">Acting Sentient</p>
          <p className="text-[#ACACAC]">GAME - I</p>
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
        <div className="mt-5">
          {textList.map((item, index) => (
            <TextItem key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </>
  );
}
