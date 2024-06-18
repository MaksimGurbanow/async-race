import { WinnerInfo, urls } from "@/customTypes/types";

export default async function updateWinner(url: urls, id: string, data: WinnerInfo): Promise<WinnerInfo> {
  try {
    const response = await fetch(`http://127.0.0.1:000/${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins: data.wins,
        time: data.time,
      }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}
