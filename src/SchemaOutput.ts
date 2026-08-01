import {
  generateRandomAmount,
  getRandomArrayElement,
  getMalformedKey,
} from "./utilities.js";
import generateDataFromSchemaElement from "./datagen.js";

// TODO: Refactor O(N^2) Time Complexity of the parseOptions function

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

function isSchemaElement(schemaElement: SchemaElement) {
  return !(schemaElement as SchemaProperties).properties;
}

function selectKeys(keys: string[], changesAmount: number) {
  let objectKeys = [...keys];
  let changeKeys: string[] = [];

  for (let i = 0; i < changesAmount; i++) {
    const key = getRandomArrayElement(objectKeys);
    const index = objectKeys.findIndex((e) => e === key);
    objectKeys.splice(index, 1);
    changeKeys.push(key);
  }

  return changeKeys;
}

function parseOptions(keys: string[], options: Options) {
  let changes: Record<string, string> = {};
  if (options.probability < Math.random()) return changes;

  let oneEach = false;
  let appliedOptions: string[] = [];

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
      : enabledOptions[appliedOptions.length];
    if (!appliedOptions.includes(option)) {
      appliedOptions.push(option);
    }
    if (appliedOptions.length === enabledOptions.length) {
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

  if (array && i !== undefined) {
    output[i] = {};
    outputRef = output[i];
  }

  if (options)
    changes = parseOptions(
      Object.keys((schema.properties as SchemaProperties) ?? schema),
      options,
    );

  for (let [key, value] of Object.entries(
    (schema.properties as SchemaProperties) ?? schema,
  )) {
    if (changes[key] === "missing") continue;
    if (changes[key] === "malformed") key = getMalformedKey(key);
    if (isSchemaElement(value as SchemaElement)) {
      outputRef[key] = generateDataFromSchemaElement(
        value as SchemaElement,
        changes[key] === "wrongType" ? true : false,
      );
    } else {
      outputRef[key] = generateOutputFromSchema(
        ((schema.properties as SchemaProperties) ?? schema)[key] as Schema,
      );
    }
  }
}
