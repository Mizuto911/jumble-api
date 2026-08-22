import { faker } from "@faker-js/faker";
import { InvalidRangeError, InvalidDateStringError } from "./error.js";
import { getRandomTrueOrFalse } from "./utilities.js";

type FormatTypes = PrimaryTypes | MockTypes;
type Generator = (
  min?: number | string | null,
  max?: number | string | null,
) => any;

function requireNumericRange(
  min?: number | string | null,
  max?: number | string | null,
) {
  if (
    (min != null && typeof min !== "number") ||
    (max != null && typeof max !== "number")
  )
    throw new InvalidRangeError(
      "The 'min' and 'max' property must be of type 'number' for string format generation.",
    );

  return { rMin: min, rMax: max };
}

function parseToDate(value?: string | number | null) {
  if (value == null) return undefined;
  const timestamp =
    typeof value === "number" ? value : new Date(value).getTime();
  if (isNaN(timestamp)) throw new InvalidDateStringError();

  return timestamp;
}

export default {
  string: (min?: number | string | null, max?: number | string | null) => {
    const { rMin, rMax } = requireNumericRange(min, max);
    return faker.lorem.words({
      min: rMin ?? 1,
      max: rMax != null ? rMax : rMin != null ? rMin + 10 : 10,
    });
  },
  number: (min?: number | string | null, max?: number | string | null) => {
    const { rMin, rMax } = requireNumericRange(min, max);
    return faker.number.int({ min: rMin ?? 0, max: rMax ?? 99999999999999 });
  },
  boolean: () => getRandomTrueOrFalse(),
  date: (min?: number | string | null, max?: number | string | null) => {
    let from: number;
    let to: number;

    const minDate = parseToDate(min);
    const maxDate = parseToDate(max);

    from = minDate != null ? minDate : new Date().getTime() - 157788000000;
    to =
      maxDate != null
        ? maxDate
        : minDate != null
          ? minDate + 157788000000 * 2
          : new Date().getTime() + 157788000000;

    return faker.date.between({ from, to });
  },
  sex: () => faker.person.sex(),
  fullname: () => faker.person.fullName(),
  firstname: () => faker.person.firstName(),
  lastname: () => faker.person.lastName(),
  email: () => faker.internet.email(),
  phone: () => `09${faker.string.numeric(9)}`,
  url: () => faker.internet.url(),
  imageUrl: () => faker.image.urlPicsumPhotos(),
  avatarUrl: () => faker.image.avatar(),
  portrait: () => faker.image.personPortrait(),
  countryCode: () => faker.location.countryCode(),
  address: () =>
    `${faker.location.streetAddress()}, ${faker.location.state()}, ${faker.location.country()}`,
  color: () => faker.color.rgb(),
  zipcode: () => faker.location.zipCode(),
  currency: () => faker.finance.currencyCode(),
  uuid: () => faker.string.uuid(),
} satisfies Record<FormatTypes, Generator>;
