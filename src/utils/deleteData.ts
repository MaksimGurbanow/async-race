import { urls } from "@/customTypes/types";

export default async function deleteData(url: urls, id: string) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}/${parseInt(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.log(error);
  }
}