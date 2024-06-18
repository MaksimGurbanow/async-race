import { CarInfo, urls } from "@/customTypes/types";

export default async function getData(url: urls, page: string): Promise<{ cars: CarInfo[], totalCount: string } | undefined> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/${url}?_page=${page}&_limit=7`);
    if (response.ok) {
      const res = { cars: [], totalCount: '' };
      res.cars = await response.json();
      res.totalCount = response.headers.get('X-Total-Count') || '';
      return res;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
