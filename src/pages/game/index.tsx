import Layout from "@/components/layout";
import Intro from "./components/intro";
import LiveVote from "./components/live-vote";
import SystemProcess from "./components/system-process";
import ChatMessage from "./components/chat-message";
import Rules from "./components/rules";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lore from "./components/lore";
import { defaultGameItem, GameListItem, getGameById } from "@/services/getGame";
import { Dialog } from "@mui/material";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getPlayerList, PlayerListItem } from "@/services/getPlayer";
import socket from "@/utils/websocket";
import {
  GameChatResponse,
  GameSystemMessage,
  getGameChat,
  getGameSystemMessage,
} from "@/services/getChat";

export default function GamePage() {
  const { id } = useParams();
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const [playerList, setPlayerList] = useState<PlayerListItem[]>([]);
  const [gameData, setGameData] = useState<GameListItem>({
    ...defaultGameItem,
  });
  const [systemMessage, setSystemMessage] = useState<GameSystemMessage[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [chatMessageList, setChatMessageList] = useState<
    (GameChatResponse & {
      name: string;
      model: string;
      img: string;
      isSocket: boolean;
    })[]
  >([]);
  const [nowShowType, setNowShowType] = useState<"rules" | "lore" | "home">(
    "home"
  );
  useEffect(() => {
    init();
  }, [id]);
  useEffect(() => {
    socket.on("system", handleSystem);
    socket.on("imposters", handleImposters);
    return () => {
      socket.off("system", handleSystem);
      socket.off("imposters", handleImposters);
    };
  }, [playerList]);
  const init = async () => {
    const gamedata = await getGameById(Number(id || 0));
    setGameData(gamedata);
    const playerlist = await getPlayerList(gamedata._id);
    setPlayerList(playerlist);
    const systemMessage = await getGameSystemMessage(gamedata._id);
    setSystemMessage(systemMessage);
    if (
      systemMessage[systemMessage.length - 1]?.type === 1 &&
      systemMessage[systemMessage.length - 1]?.object?.period ===
        "Waiting For Voting"
    ) {
      setIsVoting(true);
    } else {
      setIsVoting(false);
    }
    if (systemMessage.length > 2) {
      setIsInit(false);
    }
    if (
      systemMessage[systemMessage.length - 1]?.type === 1 &&
      String(systemMessage[systemMessage.length - 1]?.object?.period)?.includes(
        "Game over"
      )
    ) {
      setIsOver(true);
    }
    const gameChat = await getGameChat(gamedata._id, gamedata.phrase);
    setChatMessageList(
      gameChat.map((item) => {
        let content = item.content;
        if (item.playerId === 9999) {
          content = Object.entries(item.content).reduce((acc, [key, value]) => {
            const name =
              playerList?.find((ite) => ite._id === Number(key))?.name || key;
            return acc + name + " received " + value + " votes.\n";
          }, "");
        } else if (item.playerId === 9998) {
          content = (item.content as any)?.name + " Dead";
        }
        const player = playerlist.find(
          (player) => player._id === item.playerId
        );
        return {
          ...item,
          name: player?.name || "",
          img: player?.img || "",
          model: player?.model || "",
          isSocket: false,
          content: content,
        };
      })
    );
  };
  const handleSystem = useCallback(
    (res: string) => {
      const socketSystem = JSON.parse(res);
      console.log("system:", socketSystem);
      setSystemMessage((systemMessage) => {
        return [...systemMessage, socketSystem];
      });
      if (socketSystem.type === 3) {
        setChatMessageList((chatMessageList) => {
          const content = Object.entries(socketSystem.object).reduce(
            (acc, [key, value]) => {
              const name =
                playerList?.find((ite) => ite._id === Number(key))?.name || key;
              return acc + name + " received " + value + " votes.\n";
            },
            ""
          );
          return [
            ...chatMessageList,
            {
              playerId: 9999,
              content: content,
              reasoning: "",
              name: "",
              img: "",
              time: "",
              isSocket: true,
              model: "",
            },
          ];
        });
      } else if (socketSystem.type === 2) {
        setChatMessageList((chatMessageList) => {
          return [
            ...chatMessageList,
            {
              playerId: 9998,
              content: socketSystem?.object?.name + " Dead",
              reasoning: "",
              name: "",
              img: "",
              time: "",
              isSocket: true,
              model: "",
            },
          ];
        });
        setPlayerList((playerList) => {
          return playerList.map((player) => {
            if (player._id === socketSystem?.object?._id) {
              return {
                ...player,
                status: socketSystem?.object?.status,
              };
            }
            return player;
          });
        });
      } else if (
        socketSystem.type === 1 &&
        socketSystem?.object?.period === "Waiting For Voting"
      ) {
        setIsVoting(true);
      } else {
        setIsVoting(false);
      }
      if (
        socketSystem?.type === 1 &&
        socketSystem?.object?.period?.includes("Game over")
      ) {
        setIsOver(true);
      }
      if (
        socketSystem.type === 4 &&
        socketSystem?.object?.content === "livestream protocol activated"
      ) {
        setIsInit(false);
      }
    },
    [playerList]
  );
  const handleImposters = useCallback(
    (res: string) => {
      const socketChat = JSON.parse(res);
      console.log("chat", socketChat);
      setChatMessageList((chatMessageList) => {
        const player = playerList.find(
          (player) => player._id === socketChat.playerId
        );
        const newMessage = {
          content: socketChat.message.content,
          reasoning: socketChat.message?.reasoning || "",
          playerId: socketChat.playerId,
          name: player?.name || "",
          img: player?.img || "",
          model: player?.model || "",
          time: socketChat.time,
          isSocket: true,
        };
        return [...chatMessageList, newMessage];
      });
    },
    [playerList]
  );
  return (
    <Layout>
      <div className="text-white grid grid-cols-4 gap-8">
        <div className="col-span-1 h-[calc(100vh-90px)] overflow-auto hide-scrollbar">
          <Intro
            setNowShowType={(type: "rules" | "lore" | "home") => {
              setNowShowType(type);
              if (type === "home") {
                init();
              }
            }}
            gameData={gameData}
          />
          <LiveVote
            gameData={gameData}
            playerList={playerList}
            isVoting={isVoting}
          />
        </div>
        <div className="col-span-3">
          {nowShowType === "home" && (
            <>
              <SystemProcess
                playerList={playerList}
                systemMessage={systemMessage as GameSystemMessage[]}
                isInit={isInit}
                isVoting={isVoting}
              />
              <ChatMessage
                chatMessageList={chatMessageList}
                isInit={isInit}
                isVoting={isVoting}
                isOver={isOver}
              />
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
