import express from "express";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { getRandomTrueOrFalse, randomOptionQuery } from "../utilities.js";
import {
  checkJumbleOptionQuery,
  checkSchemaBody,
  checkSchemaInQuery,
} from "../middleware/validator.js";

const router = express.Router();

router.get("/", checkSchemaInQuery, checkJumbleOptionQuery, (req, res) => {
  const options = req.options;
  const schema = req.schema;

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

router.post("/", checkSchemaBody, checkJumbleOptionQuery, (req, res) => {
  const schema = req.schema;
  const options = req.options;

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

router.get("/random", checkSchemaInQuery, (req, res) => {
  const schema = req.schema;
  const options = randomOptionQuery();

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

router.post("/random", checkSchemaBody, (req, res) => {
  const schema = req.schema;
  const options = randomOptionQuery();

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
