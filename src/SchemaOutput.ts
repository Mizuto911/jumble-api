export default function generateOutputFromSchema(schema: Schema) {
  let output: SchemaOutput = {};

  for (const [key, value] of Object.entries(schema)) {
    if (isSchemaElement(value)) {
      if (isAdvancedOptions(value)) {
        output[key] = "This is Advanced Data!";
      } else {
        output[key] = "This is Default Data!";
      }
    } else {
      output[key] = generateOutputFromSchema(schema[key] as Schema);
    }
  }

  return output;
}

function isSchemaElement(schemaElement: Schema | SchemaElement) {
  return (
    (typeof schemaElement === "object" && schemaElement._type) ||
    typeof schemaElement === "string"
  );
}

function isAdvancedOptions(schemaElement: Schema | SchemaElement) {
  return (
    typeof schemaElement === "object" &&
    (schemaElement.sampleResponse || schemaElement.contentType)
  );
}
