import express from "express";
import { schemaIDExist, validateOptionQuery } from "../utilities.js";
import { schemasCollection } from "../app.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { defaultSchema } from "../schemas.js";

const router = express.Router();

// TODO: Refactor the parsing logic.

router.get("/", (req, res) => {
  const { missing, wrongType, malformed, probability, schemaID } = req.query;

  if (
    !validateOptionQuery({
      missing,
      wrongType,
      malformed,
      probability,
    } as Record<string, string>)
  ) {
    return res.status(400).json({
      success: false,
      msg: "Option queries that have been passed is invalid.",
    });
  }

  if (schemaID && !schemaIDExist(schemaID as string)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id "${schemaID}" does not exist.`,
    });
  }

  const options = {
    missing: missing === "1" ? true : false,
    wrongType: wrongType === "1" ? true : false,
    malformed: malformed === "1" ? true : false,
    probability: probability ? Number(probability) : 1,
  };

  const schema =
    schemaID && schemasCollection
      ? schemasCollection[schemaID as string]
      : undefined;

  res.status(200).json({
    success: true,
    data: generateOutputFromSchema(schema ?? defaultSchema, options),
  });
});

router.get("/random", (req, res) => {});

export default router;
