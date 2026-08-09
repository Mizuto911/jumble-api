import express from "express";
import { validateOptionQuery } from "../utilities.js";
import validateSchema from "../validator.js";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { getRandomTrueOrFalse } from "../utilities.js";

const router = express.Router();

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

  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  const options = {
    missing: missing === "1" ? true : false,
    wrongType: wrongType === "1" ? true : false,
    malformed: malformed === "1" ? true : false,
    probability: probability ? Number(probability) : 1,
  };

  try {
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

router.post("/", (req, res) => {
  const schema = req.body;

  if (!validateSchema(schema)) {
    return res.status(400).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  const { missing, wrongType, malformed, probability } = req.query;

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

  const options = {
    missing: missing === "1" ? true : false,
    wrongType: wrongType === "1" ? true : false,
    malformed: malformed === "1" ? true : false,
    probability: probability ? Number(probability) : 1,
  };

  try {
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

router.get("/random", (req, res) => {
  const { schemaID } = req.query;
  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  const options = {
    missing: getRandomTrueOrFalse() ?? false,
    wrongType: getRandomTrueOrFalse() ?? false,
    malformed: getRandomTrueOrFalse() ?? false,
    probability: Math.random(),
  };

  try {
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

router.post("/random", (req, res) => {
  const schema = req.body;

  if (!validateSchema(schema)) {
    return res.status(400).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  const options = {
    missing: getRandomTrueOrFalse() ?? false,
    wrongType: getRandomTrueOrFalse() ?? false,
    malformed: getRandomTrueOrFalse() ?? false,
    probability: Math.random(),
  };

  try {
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

export default router;
