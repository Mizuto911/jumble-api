import {
  generateRandomAmount,
  getRandomArrayElement,
  getRandomTrueOrFalse,
} from "./utilities.js";
import {
  FormatDeclarationError,
  NullSchemaElementError,
  NullPickFromArrayError,
  InvalidRangeError,
} from "./error.js";
import { faker } from "@faker-js/faker";

// TODO: Refactor Redundant Functions

export default function generateDataFromSchemaElement(
  schemaElement: SchemaElement,
  wrongType?: boolean,
) {
  if (!schemaElement) throw new NullSchemaElementError();
  if (wrongType) {
    return generateWrongType(
      typeof schemaElement === "object" && schemaElement.format
        ? schemaElement.format
        : typeof schemaElement === "string"
          ? schemaElement
          : undefined,
    );
  }

  let data;
  let arrayLength: ArrayLength;
  const hasPickFrom = checkValidProperties(schemaElement);

  if (typeof schemaElement === "object") {
    if (schemaElement.array) {
      data = [];
      arrayLength =
        typeof schemaElement.array === "number"
          ? schemaElement.array
          : generateRandomAmount(
              schemaElement.array.min,
              schemaElement.array.max,
            );

      for (let i = 0; i < arrayLength; i++) {
        data[i] = generateData(schemaElement, hasPickFrom);
      }
    } else {
      data = generateData(schemaElement, hasPickFrom);
    }
  } else {
    data = generateData(schemaElement, hasPickFrom);
  }

  return data;
}

function checkValidProperties(schemaElement: SchemaElement) {
  if (!schemaElement) throw new NullSchemaElementError();
  if (typeof schemaElement !== "object") return false;
  else if (!schemaElement.format && !schemaElement.pickFrom)
    throw new FormatDeclarationError();
  else return !!schemaElement.pickFrom;
}

function generateFormat(
  format: MockTypes | PrimaryTypes,
  min?: number | null,
  max?: number | null,
) {
  if (min && max && min > max) {
    throw new InvalidRangeError();
  }

  switch (format) {
    case "string":
      return faker.lorem.words({ min: min ?? 0, max: max ?? 10 });
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

function generatePickFrom(pickFrom: PickFrom | undefined) {
  if (!pickFrom) throw new NullPickFromArrayError(`${pickFrom}`);
  return getRandomArrayElement(pickFrom);
}

function getSchemaElementFormat(
  schemaElement: SchemaElementFormat,
): PrimaryTypes | MockTypes {
  if (!schemaElement.format) throw new FormatDeclarationError();
  return schemaElement.format;
}

function generateData(schemaElement: SchemaElement, hasPickFrom: boolean) {
  if (!schemaElement) throw new NullSchemaElementError();
  if (typeof schemaElement === "object") {
    if (hasPickFrom && schemaElement.pickFrom) {
      return generatePickFrom(schemaElement.pickFrom);
    }
    return generateFormat(
      getSchemaElementFormat(schemaElement),
      schemaElement.min,
      schemaElement.max,
    );
  }

  return generateFormat(schemaElement as PrimaryTypes | MockTypes);
}

function generateWrongType(type: string | undefined) {
  const currentTypes: PrimaryTypes[] = ["string", "boolean", "date", "number"];
  if (!type) return generateData(getRandomArrayElement(currentTypes), false);
  const currentIndex = currentTypes.findIndex((ctype) => ctype === type);
  if (currentIndex !== -1) currentTypes.splice(currentIndex, 1);
  return generateData(getRandomArrayElement(currentTypes), false);
}
