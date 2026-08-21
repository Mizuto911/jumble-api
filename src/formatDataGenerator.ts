import { faker } from "@faker-js/faker";
import { InvalidRangeError } from "./error.js";
import { getRandomTrueOrFalse } from "./utilities.js";

const string = (min?: number | string | null, max?: number | string | null) => {
  const minExist = min != null;
  const maxExist = max != null;

  if (
    (minExist && typeof min !== "number") ||
    (maxExist && typeof max !== "number")
  )
    throw new InvalidRangeError(
      "The 'min' and 'max' property must be of type 'number' for string format generation.",
    );
  return faker.lorem.words({
    min: min ?? 1,
    max: maxExist ? max : minExist ? min + 10 : 10,
  });
};

const number = (min?: number | string | null, max?: number | string | null) => {
  if (
    (min != null && typeof min !== "number") ||
    (max != null && typeof max !== "number")
  )
    throw new InvalidRangeError(
      "The 'min' and 'max' property must be of type 'number' for number format generation.",
    );
  return faker.number.int({ min: min ?? 0, max: max ?? 99999999999999 });
};

const boolean = () => {
  return getRandomTrueOrFalse();
};

const date = (min?: number | string | null, max?: number | string | null) => {
  let from: string | number;
  let to: string | Date | number;

  if (min != null && typeof min === "string") from = min;
  else from = new Date().getTime() - 157788000000; // 5 years before now

  if (max != null && typeof max === "string") to = max;
  else to = new Date().getTime() + 157788000000; // 5 years after now
  return faker.date.between({ from, to });
};

const sex = () => {
  return faker.person.sex();
};

const fullname = () => {
  return faker.person.fullName();
};

const firstname = () => {
  return faker.person.firstName();
};

const lastname = () => {
  return faker.person.lastName();
};

const email = () => {
  return faker.internet.email();
};

const phone = () => {
  return `09${faker.string.numeric(9)}`;
};

const url = () => {
  return faker.internet.url();
};

const imageUrl = () => {
  return faker.image.urlPicsumPhotos();
};

const avatarUrl = () => {
  return faker.image.avatar();
};

const portrait = () => {
  return faker.image.personPortrait();
};

const countryCode = () => {
  return faker.location.countryCode();
};

const address = () => {
  return `${faker.location.streetAddress()}, ${faker.location.state()}, ${faker.location.country()}`;
};

const color = () => {
  return faker.color.rgb();
};

const zipcode = () => {
  return faker.location.zipCode();
};

const currency = () => {
  return faker.finance.currencyCode();
};

const uuid = () => {
  return faker.string.uuid();
};

export default {
  string,
  number,
  boolean,
  date,
  sex,
  fullname,
  firstname,
  lastname,
  email,
  phone,
  url,
  imageUrl,
  avatarUrl,
  portrait,
  countryCode,
  address,
  color,
  zipcode,
  currency,
  uuid,
};
