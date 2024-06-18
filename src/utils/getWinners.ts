import { Order, Sort, WinnerInfo, urls } from "@/customTypes/types";

export default async function getWinners(
  url: urls, 
  page: string, 
  sort?: Sort, 
  order?: Order,
  ):  Promise<{ cars: WinnerInfo[], totalCount: string } | undefined> {
  try {
    let params  = ''
    if (sort && order) {
      params = `_sort=${sort}&_order=${order}`;
    }
    const response = await fetch(`http://127.0.0.1:3000/${url}?_page=${page}&${params}`);
    if (response.ok) {
      const res = { cars: [], totalCount: '' };
      res.cars = await response.json();
      res.totalCount = response.headers.get('X-Total-Count') || '';
      return res;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw error;
  }
}
