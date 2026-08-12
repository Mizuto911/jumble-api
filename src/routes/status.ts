import express from "express";
import { getRandomStatusCode } from "../utilities.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { schemasCollection } from "../server.js";
import {
  checkStatusCode,
  checkSchemaInQuery,
  checkSchemaBody,
} from "../middleware/validator.js";

const router = express.Router();

router.get("/random", checkSchemaInQuery, (req, res) => {
  const schema = req.schema;

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

router.get("/:status", checkStatusCode, checkSchemaInQuery, (req, res) => {
  const status = req.status;
  const schema = req.schema;

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

router.post("/random", checkSchemaBody, (req, res) => {
  const schema = req.schema;

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

router.post("/:status", checkStatusCode, checkSchemaBody, (req, res) => {
  const schema = req.schema;
  const status = req.status;

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
