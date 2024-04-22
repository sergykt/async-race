import { carList } from './carList';

export const getRandomCarName = () => {
  const randomBrand = carList[Math.floor(Math.random() * carList.length)];
  const { models } = randomBrand;
  const randomModel = models[Math.floor(Math.random() * models.length)];
  return `${randomBrand.brand} ${randomModel}`;
};
