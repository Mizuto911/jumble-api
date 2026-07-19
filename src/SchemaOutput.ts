import { faker } from "@faker-js/faker";
import { generateRandomAmount } from "./utilities.js";

export default function generateOutputFromSchema(schema: Schema) {
  let output: SchemaOutput = {};
  const arrayLength = schema.array as ArrayLength;

  if (arrayLength) {
    output = [];
    let itemAmount;
    if (typeof arrayLength === "number") itemAmount = arrayLength;
    else itemAmount = generateRandomAmount(arrayLength.min, arrayLength.max);

    for (let i = 0; i < itemAmount; i++) {
      generateOutput(schema, output, true, i);
    }
  } else {
    generateOutput(schema, output, false);
  }

  return output;
}

function isSchemaElement(schemaElement: SchemaElement) {
  return !(schemaElement as SchemaProperties).properties;
}

function isSchemaFormat(schemaElement: SchemaElement) {
  return !!(schemaElement as SchemaElementFormat).format;
}

function generateOutput(
  schema: Schema,
  output: SchemaOutput,
  array: boolean,
  i?: number,
) {
  let outputRef = output;
  if (array && i !== undefined) {
    output[i] = {};
    outputRef = output[i];
  }
  for (const [key, value] of Object.entries(
    (schema.properties as SchemaProperties) ?? schema,
  )) {
    if (isSchemaElement(value as SchemaElement)) {
      if (isSchemaFormat(value as SchemaElement)) {
        outputRef[key] = "AdvancedData";
      } else {
        outputRef[key] = "BasicData";
      }
    } else {
      outputRef[key] = generateOutputFromSchema(
        ((schema.properties as SchemaProperties) ?? schema)[key] as Schema,
      );
    }
  }
}
