import {
  generateRandomAmount,
  getRandomArrayElement,
  getMalformedKey,
} from "./utilities.js";
import generateDataFromSchemaElement from "./datagen.js";

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
    else itemAmount = generateRandomAmount(arrayLength.min, arrayLength.max);

    for (let i = 0; i < itemAmount; i++) {
      generateOutput(schema, output, true, options, i);
    }
  } else {
    generateOutput(schema, output, false, options);
  }

  return output;
}

function isSchemaElement(
  schemaElement: SchemaElement,
): schemaElement is SchemaElement {
  return (
    !!schemaElement &&
    (typeof schemaElement === "string" ||
      (typeof schemaElement === "object" && !("properties" in schemaElement)))
  );
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
  const changesToMake = keys.length > amount ? amount : keys.length;
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
  const keys = Object.keys((schema.properties as SchemaProperties) ?? schema);

  if (array && i !== undefined) {
    output[i] = {};
    outputRef = output[i];
  }

  if (options)
    changes = parseOptions(
      Object.keys((schema.properties as SchemaProperties) ?? schema),
      options,
    );

  for (let key of keys) {
    const schemaElement = (schema.properties as SchemaProperties) ?? schema;
    if (changes[key] === "missing") continue;
    if (isSchemaElement(schemaElement[key] as SchemaElement)) {
      outputRef[changes[key] === "malformed" ? getMalformedKey(key) : key] =
        generateDataFromSchemaElement(
          schemaElement[key] as SchemaElement,
          changes[key] === "wrongType",
        );
    } else {
      outputRef[changes[key] === "malformed" ? getMalformedKey(key) : key] =
        generateOutputFromSchema(schemaElement[key] as Schema);
    }
  }
}
