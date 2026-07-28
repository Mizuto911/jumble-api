#!/usr/bin/env node

import { parseArgs } from "node:util";
import { SchemaDirNotExistError, MalformedSchemaError } from "./error.js";
import validateSchema from "./validator.js";
import startApp from "./starter.js";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

export let schemasCollection: SchemaCollection = {};

const options = {
  port: {
    type: "string",
    short: "p",
    default: "3000",
  },
  schema: {
    type: "string",
    short: "s",
  },
} as const;

const { values } = parseArgs({ options });
const port = parseInt(values.port ?? "3000", 10);
const schemaDir = values.schema;

if (schemaDir) {
  const schemasPath = path.join(process.cwd(), schemaDir);
  const filePath = pathToFileURL(schemasPath).href;

  if (!existsSync(schemasPath)) throw new SchemaDirNotExistError();

  const { default: schemas } = await import(filePath);

  if (!schemas) throw new SchemaDirNotExistError();

  for (const [key, value] of Object.entries(schemas)) {
    if (!validateSchema(value)) {
      throw new MalformedSchemaError(
        `Schema with id "${key}" has malformed format.`,
      );
    }
  }

  schemasCollection = { ...schemas };
}

startApp(port);
