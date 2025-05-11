import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";

export interface GameListItem {
  _id: number;
  startTime: string;
  phrase: number;
  round: number;
  period: string;
  isVoting: boolean;
  name: string;
  totalSecond: number;
  parase: number;
}
export const defaultGameItem: GameListItem = {
  _id: 1,
  name: "Acting Sentient",
  startTime: "2025-05-05T06:59:57.901Z",
  phrase: 0,
  round: 1,
  period: "",
  isVoting: false,
  totalSecond: 0,
  parase: 1,
};
// Get game list
export const getGameList = async (): Promise<GameListItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/game/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to get game list");
      throw new Error("");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error getting game list");
    console.error("Error getting game list:", error);
    throw error;
  }
};
// Get game
export const getGameById = async (id: number): Promise<GameListItem> => {
  try {
    const response = await fetch(`${BASE_URL}/api/game/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to get game details");
      throw new Error("Failed to get game details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error getting game details");
    console.error("Error getting game details:", error);
    throw error;
  }
};
