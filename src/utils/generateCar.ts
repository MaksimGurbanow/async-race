import { CarInfo } from "@/customTypes/types";
import { brands, models } from "./carNames";

export default function generateRandomCar(): CarInfo {
  let randomIndex = Math.floor(Math.random() * brands.length);
  const brandName = brands[randomIndex];

  randomIndex = Math.floor(Math.random() * models.length);
  const modelName = models[randomIndex];

  return {
    name: `${brandName} ${modelName}`,
    color: getRandomColor(),
  }
}

function getRandomColor() {
  const randomInt = Math.floor(Math.random() * 16777215);
  const hexColor = randomInt.toString(16).padStart(6, '0');
  return `#${hexColor}`;
}