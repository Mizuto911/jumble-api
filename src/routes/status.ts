import express from "express";
import { isValidStatusCode, getRandomStatusCode } from "../utilities.js";
import validateSchema from "../validator.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { schemasCollection } from "../app.js";

const router = express.Router();

router.get("/random", (req, res) => {
  const schemaID = req.query.schemaID;
  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema && schemaID) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  try {
    return res.status(getRandomStatusCode()).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
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

  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema && schemaID) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  try {
    return res.status(Number(status)).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
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
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
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
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
});

export default router;
