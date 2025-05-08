import Layout from "@/components/layout";
import Intro from "./components/intro";
import LiveVote from "./components/live-vote";
import SystemProcess from "./components/system-process";
import ChatMessage from "./components/chat-message";
import Rules from "./components/rules";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lore from "./components/lore";
import { defaultGameItem, GameListItem, getGameById } from "@/services/getGame";
import { Dialog } from "@mui/material";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getPlayerList, PlayerListItem } from "@/services/getPlayer";
import socket from "@/utils/websocket";
import { GameSystemMessage } from "@/services/getChat";

export default function GamePage() {
  const { id } = useParams();
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const [playerList, setPlayerList] = useState<PlayerListItem[]>([]);
  const [nowShowType, setNowShowType] = useState<"rules" | "lore" | "home">(
    "home"
  );
  const [socketSystem, setSocketSystem] = useState<GameSystemMessage>();
  const [gameData, setGameData] = useState<GameListItem>({
    ...defaultGameItem,
  });
  useEffect(() => {
    getGameById(Number(id || 0)).then((res) => {
      setGameData(res);
    });
  }, [id]);
  useEffect(() => {
    if (primaryWallet) {
      setNowShowType("home");
    }
  }, [primaryWallet]);
  useEffect(() => {
    getPlayerList(gameData._id).then((res) => {
      setPlayerList(res);
    });
  }, [gameData._id]);
  useEffect(() => {
    const handleSystem = (res: any) => {
      console.log(res);
      const socketData = JSON.parse(res);
      if (socketData.type !== 2) {
        setSocketSystem(socketData);
      } else {
        const socketPlayer = socketData;
        setPlayerList((playerList) => {
          return playerList.map((item) => {
            return {
              ...item,
              status:
                item._id === socketPlayer.object._id
                  ? socketPlayer.object.status
                  : item.status,
            };
          });
        });
      }
    };
    socket.on("system", handleSystem);

    return () => {
      socket.off("system", handleSystem);
    };
  }, []);
  return (
    <Layout>
      <div className="text-white grid grid-cols-4 gap-8">
        <div className="col-span-1 h-[calc(100vh-120px)] overflow-auto hide-scrollbar">
          <Intro setNowShowType={setNowShowType} gameData={gameData} />
          <LiveVote gameData={gameData} playerList={playerList} />
        </div>
        <div className="col-span-3">
          {nowShowType === "home" && (
            <>
              <SystemProcess
                gameData={gameData}
                playerList={playerList}
                socketSystem={socketSystem as GameSystemMessage}
              />
              <ChatMessage gameData={gameData} playerList={playerList} />
            </>
          )}
          {nowShowType === "rules" && <Rules />}
          {nowShowType === "lore" && <Lore />}
        </div>
      </div>
      {!primaryWallet?.isConnected && (
        <Dialog
          open={true}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
              maxWidth: "400px",
              width: "100%",
            },
          }}
        >
          <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0C0C0C] rounded-2xl border border-[#2A2A2A] shadow-2xl">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Connect Wallet
              </h2>
              <p className="text-[#ACACAC] text-center mb-6">
                Please connect your wallet to continue
              </p>
              <button
                onClick={() => setShowAuthFlow(true)}
                className="w-full py-3 px-6 bg-blue-500 cursor-pointer rounded-xl text-white font-bold transition-all duration-300 transform hover:opacity-70 shadow-lg"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </Layout>
  );
}
