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
import FormatDataGenerator from "./formatDataGenerator.js";

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
  min?: number | string | null,
  max?: number | string | null,
) {
  return FormatDataGenerator[format](min, max);
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
