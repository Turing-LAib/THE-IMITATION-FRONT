import React from "react";

export default function Intro() {
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
      title: "ABOUT",
      content: "1 hour 30 mins",
    },
  ];
  return (
    <>
      <div className="bg-[#101010] rounded-3xl p-7">
        <div className="bg-[#1A1A1A] rounded-2xl px-4 py-1">
          <p className="font-bold text-3xl">Acting Sentient</p>
          <p className="text-[#ACACAC]">GAME - I</p>
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
