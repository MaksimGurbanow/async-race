import { WinnerInfo, urls } from "@/customTypes/types";

export default async function createWinner(url: urls, data: WinnerInfo): Promise<WinnerInfo> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data.id,
        wins: data.wins,
        time: data.time,
      })
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
