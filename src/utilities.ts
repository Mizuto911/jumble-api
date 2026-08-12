import { STATUS_CODES } from "node:http";
import { InvalidOptionsError } from "./error.js";

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

export function parseOptionQuery(option: OptionQuery) {
  let probability;
  if (option.probability !== undefined) {
    probability = Number(option.probability);
    if (isNaN(probability) || probability > 1 || probability < 0)
      throw new InvalidOptionsError();
  } else {
    probability = 1;
  }

  const parseOption = (option: string | undefined) => {
    if (option === "1") return true;
    else if (option === "0" || option === undefined) return false;
    else throw new InvalidOptionsError();
  };

  const missing = parseOption(option.missing);
  const wrongType = parseOption(option.wrongType);
  const malformed = parseOption(option.malformed);

  return { missing, wrongType, malformed, probability };
}

export function randomOptionQuery() {
  return {
    missing: getRandomTrueOrFalse() ?? false,
    wrongType: getRandomTrueOrFalse() ?? false,
    malformed: getRandomTrueOrFalse() ?? false,
    probability: Math.random(),
  };
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
