import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";
import { GameListItem } from "./getGame";
import { PlayerListItem } from "./getPlayer";

export interface GameChatResponse {
  playerId: number;
  content: string;
  reasoning: string;
  _id?: string;
  time: string;
}

export const getGameChat = async (
  gameId: number,
  phrase: number
): Promise<GameChatResponse[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/game/chat?gid=${gameId}&phrase=${phrase}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      toast.error("Failed to get game chat");
      throw new Error("Failed to get game chat");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error getting game chat");
    console.error("Error getting game chat:", error);
    throw error;
  }
};
export interface GameSystemMessage {
  _id: string;
  type: number;
  gameId: number;
  object: GameListItem | PlayerListItem | { [key: string]: number };
}

export const getGameSystemMessage = async (
  gameId: number
): Promise<GameSystemMessage[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/game/sysmsg?gid=${gameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to get game system message");
      throw new Error("Failed to get game system message");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error getting game system message");
    console.error("Error getting game system message:", error);
    throw error;
  }
};
