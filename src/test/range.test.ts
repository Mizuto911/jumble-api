import { describe, expect, it } from "vitest";
import generateDataFromSchemaElement from "../datagen.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { InvalidRangeError } from "../error.js";

describe("range validation", () => {
  it("allows equal array bounds at every schema level", () => {
    expect(
      generateOutputFromSchema({ array: { min: 2, max: 2 }, properties: {} }),
    ).toHaveLength(2);
    expect(
      generateDataFromSchemaElement({
        format: "string",
        array: { min: 2, max: 2 },
      }),
    ).toHaveLength(2);
  });

  it("rejects reversed array bounds", () => {
    expect(() =>
      generateOutputFromSchema({ array: { min: 3, max: 2 }, properties: {} }),
    ).toThrow(InvalidRangeError);
    expect(() =>
      generateDataFromSchemaElement({
        format: "string",
        array: { min: 3, max: 2 },
      }),
    ).toThrow(InvalidRangeError);
  });

  it("rejects reversed date bounds", () => {
    expect(() =>
      generateOutputFromSchema({
        date: { format: "date", min: "2025-02-01", max: "2025-01-01" },
      }),
    ).toThrow(InvalidRangeError);
  });
});
