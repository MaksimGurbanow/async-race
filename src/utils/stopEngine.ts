import { urls } from "@/customTypes/types";

export default async function stopEngine(url: urls, id: string, status = 'stopped') {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}/?id=${id}&status=${status}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}