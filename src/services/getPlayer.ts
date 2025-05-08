import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";

export interface PlayerListItem {
  _id: number;
  model: string;
  status: number;
  name: string;
  img: string;
  period: string;
  round: number;
  phrase: number;
  startTime: string;
  totalSecond: number;
}

export const defaultPlayerItem: PlayerListItem = {
  _id: 1,
  model: "deepseek-reasoner",
  status: 1,
  name: "",
  img: "",
  period: "",
  round: 1,
  phrase: 1,
  startTime: "",
  totalSecond: 0,
};

export const getPlayerList = async (
  gameId: number
): Promise<PlayerListItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}api/player/list?gid=${gameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to get player list");
      throw new Error("Failed to get player list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error getting player list");
    console.error("Error getting player list:", error);
    throw error;
  }
};
