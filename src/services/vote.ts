import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";

export interface VoteInfo {
  address: string;
  round: number;
  playerId: number;
}

export const getVoteInfo = async (
  address: string,
  gameId: number
): Promise<VoteInfo> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/game/vote?address=${address}&gameId=${gameId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      toast.error("Failed to get vote information");
      throw new Error("Failed to get vote info");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error getting vote information");
    console.error("Error getting vote info:", error);
    throw error;
  }
};
export interface VoteResponse {
  code: number;
  msg: string;
  data: {
    result: boolean;
  };
}

export const submitVote = async (
  address: string,
  gameId: number,
  playerId: number
): Promise<VoteResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/game/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        gameId,
        playerId,
      }),
    });

    if (!response.ok) {
      toast.error("投票失败");
      throw new Error("Failed to submit vote");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("投票出错");
    console.error("Error submitting vote:", error);
    throw error;
  }
};
