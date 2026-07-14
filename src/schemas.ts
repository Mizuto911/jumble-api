import type { JSONSchemaType } from "ajv";

const SchemaModel: JSONSchemaType<Schema> = {
  type: "object",
  required: [],
  additionalProperties: {
    type: ["string", "object"],
    oneOf: [
      {
        type: "string",
        enum: ["string", "number", "boolean", "date"],
      },
      {
        type: "object",
        required: ["_type"],
        properties: {
          _type: {
            type: ["string", "array"],
            oneOf: [
              {
                type: "string",
                enum: ["string", "number", "boolean", "date", "*"],
              },
              {
                type: "array",
                items: {
                  type: "string",
                  enum: ["string", "number", "boolean", "date"],
                },
              },
            ],
          },
          sampleResponse: {
            type: ["array", "null"],
            oneOf: [
              {
                type: "array",
                items: {
                  type: "string",
                },
              },
              {
                type: "null",
                nullable: true,
              },
            ],
            nullable: true,
          },
          contentType: {
            type: ["string", "null"],
            oneOf: [
              {
                type: "string",
                enum: [
                  "longText",
                  "fullname",
                  "firstname",
                  "lastname",
                  "email",
                  "phone",
                  "age",
                  "url",
                  "imageUrl",
                  "address",
                  "price",
                  "currency",
                  "uuid",
                ],
              },
              {
                type: "null",
                nullable: true,
              },
            ],
            nullable: true,
          },
        },
      },
      {
        type: "object",
        required: [],
        $ref: "#",
      },
    ],
  },
};

export default SchemaModel;
