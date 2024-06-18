import { EngineProperties, urls } from "@/customTypes/types";

export default async function startEngine(url: urls, id: string, status: 'started' | 'stopped'): Promise<EngineProperties> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}?id=${id}&status=${status}`, {
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
