import {
  generateRandomAmount,
  getRandomArrayElement,
  getMalformedKey,
} from "./utilities.js";
import generateDataFromSchemaElement from "./datagen.js";
import { MalformedSchemaError, InvalidRangeError } from "./error.js";

export default function generateOutputFromSchema(
  schema: Schema,
  options?: Options,
) {
  let output: SchemaOutput = {};
  const arrayLength = schema.array as ArrayLength;

  if (arrayLength) {
    output = [];
    let itemAmount;
    if (typeof arrayLength === "number") itemAmount = arrayLength;
    else if (arrayLength.min < arrayLength.max)
      itemAmount = generateRandomAmount(arrayLength.min, arrayLength.max);
    else throw new InvalidRangeError();

    for (let i = 0; i < itemAmount; i++) {
      generateOutput(schema, output, true, options, i);
    }
  } else {
    generateOutput(schema, output, false, options);
  }

  return output;
}

function isSchemaWrapper(
  schema: Schema,
): schema is { array?: ArrayLength; properties: SchemaProperties } {
  return (
    typeof schema === "object" &&
    schema !== null &&
    "properties" in schema &&
    !("format" in schema) &&
    !("pickFrom" in schema)
  );
}

function getSchemaProperties(schema: Schema): SchemaProperties {
  return isSchemaWrapper(schema) ? schema.properties : schema;
}

function validateSchemaElement(
  schemaElement: Schema | SchemaElement | undefined,
): schemaElement is SchemaElement {
  let isSchemaElement = false;

  if (
    (schemaElement &&
      typeof schemaElement === "object" &&
      !("properties" in schemaElement)) ||
    typeof schemaElement === "string"
  ) {
    isSchemaElement = true;
    if (
      typeof schemaElement === "object" &&
      "format" in schemaElement &&
      schemaElement.min !== undefined &&
      schemaElement.min !== null &&
      schemaElement.max !== undefined &&
      schemaElement.max !== null &&
      schemaElement.min > schemaElement.max
    ) {
      throw new InvalidRangeError();
    }
  }

  return isSchemaElement;
}

function selectKeys(keys: string[], changesAmount: number) {
  if (changesAmount > keys.length)
    throw new RangeError(
      "Value 'Changes Amount' cannot be less than the length of keys array.",
    );

  let objectKeys = [...keys];
  let length = keys.length;

  for (let i = 0; i < changesAmount; i++) {
    const randomIndex = Math.floor(Math.random() * (length - i));
    const randomKey = objectKeys[randomIndex];
    const lastElement = objectKeys[length - i - 1];
    if (!randomKey || !lastElement)
      throw new TypeError("Keys array cannot contain undefined elements.");
    objectKeys[length - i] = randomKey;
    objectKeys[randomIndex] = lastElement;
  }

  return objectKeys.slice(-changesAmount);
}

function parseOptions(keys: string[], options: Options) {
  let changes: Record<string, string> = {};
  if (options.probability < Math.random()) return changes;

  let oneEach = false;
  let appliedOptions: Set<string> = new Set();
  let enabledOptions: string[] = [];

  for (const [key, value] of Object.entries(options)) {
    if (key === "probability") continue;
    if (value) enabledOptions.push(key);
  }

  const amount = Math.floor(keys.length / 3);
  const changesToMake =
    enabledOptions.length < amount
      ? amount
      : enabledOptions.length > keys.length
        ? keys.length
        : enabledOptions.length;
  const changeKeys = selectKeys(keys, changesToMake);

  changeKeys.forEach((key) => {
    const option = oneEach
      ? getRandomArrayElement(enabledOptions)
      : enabledOptions[appliedOptions.size];
    if (!appliedOptions.has(option)) {
      appliedOptions.add(option);
    }
    if (appliedOptions.size === enabledOptions.length) {
      oneEach = true;
    }
    changes[key] = option;
  });

  return changes;
}

function generateOutput(
  schema: Schema,
  output: SchemaOutput,
  array: boolean,
  options?: Options,
  i?: number,
) {
  let outputRef = output;
  let changes: Record<string, string> = {};
  const schemaProperties = getSchemaProperties(schema);
  const keys = Object.keys(schemaProperties);

  if (array && i !== undefined) {
    output[i] = {};
    outputRef = output[i];
  }

  if (options) changes = parseOptions(keys, options);

  for (let key of keys) {
    const schemaElement = schemaProperties[key];
    const isSchemaElement = validateSchemaElement(schemaElement);

    if (changes[key] === "missing") continue;
    if (isSchemaElement) {
      outputRef[changes[key] === "malformed" ? getMalformedKey(key) : key] =
        generateDataFromSchemaElement(
          schemaElement,
          changes[key] === "wrongType",
        );
    } else if (typeof schemaElement === "object") {
      outputRef[changes[key] === "malformed" ? getMalformedKey(key) : key] =
        generateOutputFromSchema(schemaElement, options);
    } else {
      throw new MalformedSchemaError(
        `The schema element for key '${key}' is not valid.`,
      );
    }
  }
}
