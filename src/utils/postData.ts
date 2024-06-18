import { CarInfo, urls } from "@/customTypes/types";


export default async function postData(url: urls, data: CarInfo) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to post data to ${url}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}
