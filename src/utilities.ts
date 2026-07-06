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
