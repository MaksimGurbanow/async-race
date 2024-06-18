import { urls } from "@/customTypes/types";

export default async function turnDriveMode(url: urls, id: string, status: 'drive' = 'drive') {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}?id=${id}&status=${status}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.status;
  } catch (error) {
    console.log(error)
  }
}