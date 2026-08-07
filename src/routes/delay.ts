import express from "express";
import { convertDelayValueToMS } from "../utilities.js";
import validateSchema from "../validator.js";
import { schemasCollection } from "../app.js";
import generateOutputFromSchema from "../SchemaOutput.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query: delayQuery = req.query;
  const querySet = new Set(["ms", "us", "ns", "s"]);
  const value = query.value ? parseInt(query.value, 10) : 5000;

  if (isNaN(value) || value < 0) {
    return res.status(400).json({
      success: false,
      msg: "Invalid delay value provided. It must be a non-negative number.",
    });
  }

  const units = query.value ? (query.units ?? "ms") : "ms";

  if (!querySet.has(units)) {
    return res.status(400).json({
      success: false,
      msg: "Invalid delay units provided. It must be one of 'ms', 'us', 'ns', or 's'.",
    });
  }

  const delay = convertDelayValueToMS(value, units);

  const schemaID = req.query.schemaID;
  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  setTimeout(() => {
    try {
      return res.status(200).json({
        success: true,
        data: generateOutputFromSchema(schema ?? schemasCollection.default),
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        msg: (e as Error).message,
      });
    }
  }, delay);
});

router.get("/random", (req, res) => {
  const schemaID = req.query.schemaID;
  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  const randomDelay = Math.random() * 30000;

  setTimeout(() => {
    try {
      return res.status(200).json({
        success: true,
        data: generateOutputFromSchema(schema ?? schemasCollection.default),
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        msg: (e as Error).message,
      });
    }
  }, randomDelay);
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
  const querySet = new Set(["ms", "us", "ns", "s"]);
  const value = query.value ? parseInt(query.value, 10) : 5000;

  if (isNaN(value) || value < 0) {
    return res.status(400).json({
      success: false,
      msg: "Invalid delay value provided. It must be a non-negative number.",
    });
  }

  const units = query.value ? (query.units ?? "ms") : "ms";

  if (!querySet.has(units)) {
    return res.status(400).json({
      success: false,
      msg: "Invalid delay units provided. It must be one of 'ms', 'us', 'ns', or 's'.",
    });
  }

  const delay = convertDelayValueToMS(value, units);

  setTimeout(() => {
    try {
      return res.status(200).json({
        success: true,
        data: generateOutputFromSchema(schema ?? schemasCollection.default),
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        msg: (e as Error).message,
      });
    }
  }, delay);
});

router.post("/random", (req, res) => {
  const schema = req.body;

  if (!validateSchema(schema)) {
    return res.status(400).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  const randomDelay = Math.random() * 30000;

  setTimeout(() => {
    try {
      return res.status(200).json({
        success: true,
        data: generateOutputFromSchema(schema ?? schemasCollection.default),
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        msg: (e as Error).message,
      });
    }
  }, randomDelay);
});

export default router;
