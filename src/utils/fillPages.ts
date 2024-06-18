import CarPage from "@/components/garage/car_list/CarPage";

export default function fillPages(pages: CarPage[], curIndex = 0) {
  const { length } = pages
  if (curIndex >= length - 1) {
    return pages;
  }

  let elementFromNextArray = pages[curIndex + 1].getItems().shift();

  if (elementFromNextArray !== undefined) {
    const curPage = pages[curIndex];
    const lastPage = pages[pages.length - 1];
    curPage.addItem(elementFromNextArray);
    curPage.moveChild(elementFromNextArray);
  } else {
    return pages;
  }

  return fillPages(pages, curIndex + 1);
}