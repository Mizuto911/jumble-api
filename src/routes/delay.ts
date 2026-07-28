import express from "express";
import { convertDelayValueToMS, schemaIDExist } from "../utilities.js";
import validateSchema from "../validator.js";
import { defaultSchema } from "../schemas.js";
import { schemasCollection } from "../app.js";
import generateOutputFromSchema from "../SchemaOutput.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query: delayQuery = req.query;
  const value = query.value ?? 5000;
  const units = query.value ? (query.units ?? "ms") : "ms";
  const delay = convertDelayValueToMS(value, units);

  const schemaID = req.query.schemaID;

  if (schemaID && !schemaIDExist(schemaID as string)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id "${schemaID}" does not exist.`,
    });
  }

  const schema =
    schemaID && schemasCollection
      ? schemasCollection[schemaID as string]
      : undefined;

  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: generateOutputFromSchema(schema ?? defaultSchema),
    });
  }, delay);
});

router.post("/", (req, res) => {
  const schema = req.body;

  if (!validateSchema(schema)) {
    return res.status(400).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  const query: delayQuery = req.query;
  const value = query.value ?? 5000;
  const units = query.value ? (query.units ?? "ms") : "ms";
  const delay = convertDelayValueToMS(value, units);
  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: generateOutputFromSchema(schema ?? defaultSchema),
    });
  }, delay);
});

export default router;
