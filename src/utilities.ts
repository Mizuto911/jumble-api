import { STATUS_CODES } from "node:http";

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

export function getRandomStatusCode() {
  const statusKeys = Object.keys(STATUS_CODES);
  return Number(getRandomArrayElement(statusKeys));
}

export function validateOptionQuery(option: OptionQuery) {
  const probability = Number(option.probability);
  if (
    option.probability &&
    (Number.isNaN(probability) || probability > 1 || probability < 0)
  )
    return false;

  const isValid = (option: string | undefined) =>
    option === undefined || option === "0" || option === "1";

  if (!isValid(option.missing)) return false;
  if (!isValid(option.wrongType)) return false;
  if (!isValid(option.malformed)) return false;

  return true;
}

export function getMalformedKey(key: string) {
  const malformedKey = key.split("");
  malformedKey[generateRandomAmount(0, key.length - 1)] = getRandomLetter();
  return malformedKey.join("");
}

function getRandomLetter() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters.charAt(Math.floor(Math.random() * letters.length));
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
