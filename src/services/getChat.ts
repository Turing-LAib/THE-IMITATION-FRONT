import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";

export interface GameChatResponse {
  playerId: number;
  gameId: number;
  phrase: number;
  round: number;
  type: number;
  content: string;
}

export const getGameChat = async (
  gameId: number,
  phrase: number,
  round: number
): Promise<GameChatResponse[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}api/game/chat?gid=${gameId}&phrase=${phrase}&round=${round}`,
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
