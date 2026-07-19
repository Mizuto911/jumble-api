import type { AnySchema } from "ajv";

const SchemaModel: AnySchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://jumble-api.internal/schema-definition.json",
  title: "Schema",
  anyOf: [
    { $ref: "#/definitions/SchemaProperties" },
    {
      type: "object",
      required: ["properties"],
      properties: {
        array: { $ref: "#/definitions/ArrayLength" },
        properties: { $ref: "#/definitions/SchemaProperties" },
      },
      additionalProperties: false,
    },
  ],
  definitions: {
    PrimaryTypes: {
      type: "string",
      enum: ["string", "number", "boolean", "date"],
    },
    MockTypes: {
      anyOf: [
        {
          type: "string",
          enum: [
            "sex",
            "fullname",
            "firstname",
            "lastname",
            "email",
            "phone",
            "url",
            "imageUrl",
            "avatarUrl",
            "countryCode",
            "address",
            "color",
            "zipcode",
            "currency",
            "uuid",
          ],
        },
        { type: "null" },
      ],
    },
    PickFrom: {
      anyOf: [
        {
          type: "array",
          items: {
            type: ["string", "number", "boolean"],
          },
        },
        { type: "null" },
      ],
    },
    ArrayLength: {
      anyOf: [
        { type: "number" },
        {
          type: "object",
          required: ["min", "max"],
          properties: {
            min: { type: "number" },
            max: { type: "number" },
          },
          additionalProperties: false,
        },
        { type: "null" },
      ],
    },
    SchemaElementFormat: {
      type: "object",
      required: [],
      properties: {
        array: { $ref: "#/definitions/ArrayLength" },
        format: {
          anyOf: [
            { $ref: "#/definitions/PrimaryTypes" },
            { $ref: "#/definitions/MockTypes" },
          ],
        },
        pickFrom: { $ref: "#/definitions/PickFrom" },
        min: { type: ["number", "null"] },
        max: { type: ["number", "null"] },
      },
      additionalProperties: false,
    },
    SchemaElement: {
      anyOf: [
        { $ref: "#/definitions/PrimaryTypes" },
        { $ref: "#/definitions/MockTypes" },
        { $ref: "#/definitions/SchemaElementFormat" },
      ],
    },
    SchemaProperties: {
      type: "object",
      additionalProperties: {
        anyOf: [{ $ref: "#/definitions/SchemaElement" }, { $ref: "#" }],
      },
    },
  },
};

export default SchemaModel;
