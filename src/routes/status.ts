import express from "express";
import {
  isValidStatusCode,
  schemaIDExist,
  getRandomStatusCode,
} from "../utilities.js";
import validateSchema from "../validator.js";
import { defaultSchema } from "../schemas.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { schemasCollection } from "../app.js";

const router = express.Router();

router.get("/random", (req, res) => {
  const schemaID = req.query.schemaID;

  if (schemaID && !schemaIDExist(schemaID as string)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  const schema =
    schemaID && schemasCollection
      ? schemasCollection[schemaID as string]
      : undefined;

  try {
    return res.status(getRandomStatusCode()).json({
      success: true,
      data: generateOutputFromSchema(schema ?? defaultSchema),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

router.get("/:status", (req, res) => {
  const status = req.params.status;
  const schemaID = req.query.schemaID;
  if (!isValidStatusCode(status)) {
    return res
      .status(400)
      .json({ success: false, msg: `Status code ${status} is invalid.` });
  }

  if (schemaID && !schemaIDExist(schemaID as string)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  const schema =
    schemaID && schemasCollection
      ? schemasCollection[schemaID as string]
      : undefined;

  try {
    return res.status(Number(status)).json({
      success: true,
      data: generateOutputFromSchema(schema ?? defaultSchema),
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

  try {
    return res.status(getRandomStatusCode()).json({
      success: true,
      data: generateOutputFromSchema(schema ?? defaultSchema),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

router.post("/:status", (req, res) => {
  const schema = req.body;

  if (!validateSchema(schema)) {
    return res.status(400).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  const status = req.params.status;
  if (!isValidStatusCode(status)) {
    return res
      .status(400)
      .json({ success: false, msg: `Status code ${status} is invalid.` });
  }

  try {
    return res.status(Number(status)).json({
      success: true,
      data: generateOutputFromSchema(schema ?? defaultSchema),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

export default router;
