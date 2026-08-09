import { parseArgs } from "node:util";
import { SchemaDirNotExistError, MalformedSchemaError } from "./error.js";
import validateSchema from "./validator.js";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

export default async function parseSettings() {
  let port: number | undefined;
  let schemas: SchemaCollection | undefined;

  const options = {
    port: {
      type: "string",
      short: "p",
      default: "3030",
    },
    schema: {
      type: "string",
      short: "s",
    },
  } as const;

  const { values } = parseArgs({ options });
  port = parseInt(values.port ?? "3030", 10);
  const schemaDir = values.schema;

  if (schemaDir) {
    const schemasPath = path.join(process.cwd(), schemaDir);
    const filePath = pathToFileURL(schemasPath).href;

    if (!existsSync(schemasPath)) throw new SchemaDirNotExistError();

    schemas = (await import(filePath)).default;
    if (!schemas) throw new SchemaDirNotExistError();

    for (const [key, value] of Object.entries(schemas)) {
      if (!validateSchema(value)) {
        throw new MalformedSchemaError(
          `Schema with id "${key}" has malformed format.`,
        );
      }
    }
  }

  return { port, schemas };
}
