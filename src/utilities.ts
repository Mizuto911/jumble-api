import { STATUS_CODES } from "node:http";
import { schemasCollection } from "./app.js";

export function convertDelayValueToMS(value: number, units: Units) {
  const conversionRates: Record<Units, number> = {
    ns: 0.000001,
    us: 0.001,
    s: 1000,
    ms: 1,
  };

  return value * conversionRates[units];
}

export function isValidStatusCode(status: string) {
  return Object.keys(STATUS_CODES).includes(status);
}

export function generateRandomAmount(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayElement(array: Array<any>) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomTrueOrFalse() {
  return [true, false][Math.round(Math.random())];
}

export function schemaIDExist(id: string | undefined) {
  return id ? (schemasCollection ? !!schemasCollection[id] : false) : false;
}
