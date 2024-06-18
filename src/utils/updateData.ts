import { CarInfo, urls } from "@/customTypes/types";

export default async function updateData(url: urls, id: string, data: CarInfo): Promise<CarInfo | undefined> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
