import {
  generateRandomAmount,
  getRandomArrayElement,
  getRandomTrueOrFalse,
} from "./utilities.js";
import {
  NullSchemaElementError,
  InvalidRangeError,
  FormatDeclarationError,
  NullPickFromArrayError,
} from "./error.js";
import { faker } from "@faker-js/faker";

export default function generateDataFromSchemaElement(
  schemaElement: SchemaElement,
) {
  if (!schemaElement) throw new NullSchemaElementError();

  let data;
  let arrayLength: number;

  if (typeof schemaElement === "object") {
    if (
      schemaElement.format === undefined &&
      schemaElement.pickFrom === undefined
    )
      throw new FormatDeclarationError();
    if (schemaElement.array) {
      data = [];
      if (typeof schemaElement.array === "number")
        arrayLength = schemaElement.array;
      else if (schemaElement.array.min < schemaElement.array.max)
        arrayLength = generateRandomAmount(
          schemaElement.array.min,
          schemaElement.array.max,
        );
      else throw new InvalidRangeError();

      for (let i = 0; i < arrayLength; i++) {
        data[i] = generateData(schemaElement);
      }
    } else data = generateData(schemaElement);
  } else data = generateData(schemaElement);

  return data;
}

function generateFormat(
  format: MockTypes | PrimaryTypes,
  min?: number | null,
  max?: number | null,
) {
  switch (format) {
    case "string":
      return faker.lorem.words({ min: min ?? 1, max: max ?? 10 });
    case "number":
      return faker.number.int({ min: min ?? 0, max: max ?? 99999999999999 });
    case "boolean":
      return getRandomTrueOrFalse();
    case "date":
      return faker.date.between({
        from: min ?? new Date().getTime() - 157788000000, // 5 years before now
        to: max ?? new Date().getTime() + 157788000000, // 5 years after now
      });
    case "sex":
      return faker.person.sex();
    case "fullname":
      return faker.person.fullName();
    case "firstname":
      return faker.person.firstName();
    case "lastname":
      return faker.person.lastName();
    case "email":
      return faker.internet.email();
    case "phone":
      return `09${faker.string.numeric(9)}`;
    case "url":
      return faker.internet.url();
    case "imageUrl":
      return faker.image.urlPicsumPhotos();
    case "avatarUrl":
      return faker.image.avatar();
    case "portrait":
      return faker.image.personPortrait();
    case "countryCode":
      return faker.location.countryCode();
    case "address":
      return `${faker.location.streetAddress()}, ${faker.location.state()}, ${faker.location.country()}`;
    case "color":
      return faker.color.rgb();
    case "zipcode":
      return faker.location.zipCode();
    case "currency":
      return faker.finance.currencyCode();
    case "uuid":
      return faker.string.uuid();
  }
}

function generatePickFrom(pickFrom: PickFrom) {
  if (pickFrom.length === 0) throw new NullPickFromArrayError();
  return getRandomArrayElement(pickFrom);
}

function generateData(schemaElement: SchemaElement) {
  if (!schemaElement) throw new NullSchemaElementError();
  if (typeof schemaElement === "string") {
    return generateFormat(schemaElement);
  } else {
    if (schemaElement.pickFrom) {
      return generatePickFrom(schemaElement.pickFrom);
    }
    if (schemaElement.format !== undefined)
      return generateFormat(
        schemaElement.format,
        schemaElement.min,
        schemaElement.max,
      );
  }
}

export function generateWrongType(schemaElement: SchemaElement) {
  const type =
    typeof schemaElement === "object" && schemaElement.format
      ? schemaElement.format
      : typeof schemaElement === "string"
        ? schemaElement
        : undefined;

  let currentTypes: PrimaryTypes[] = ["string", "boolean", "date", "number"];
  if (!type) return generateData(getRandomArrayElement(currentTypes));
  currentTypes = currentTypes.filter((ctype) => ctype !== type);
  return generateData(getRandomArrayElement(currentTypes));
}
