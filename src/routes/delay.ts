import express from "express";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { catchError } from "../middleware/wrapper.js";
import {
  checkDelayQuery,
  checkSchemaBody,
  checkSchemaInQuery,
} from "../middleware/validator.js";

const router = express.Router();

const delayRes = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

router.get(
  "/",
  checkSchemaInQuery,
  checkDelayQuery,
  catchError(async (req, res) => {
    const delay = req.delay;
    const schema = req.schema;
    const data = generateOutputFromSchema(schema ?? schemasCollection.default);

    await delayRes(delay);
    return res.status(200).json({
      success: true,
      data: data,
    });
  }),
);

router.get(
  "/random",
  checkSchemaInQuery,
  catchError(async (req, res) => {
    const schema = req.schema;
    const randomDelay = Math.random() * 30000;

    await delayRes(randomDelay);
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

router.post(
  "/",
  checkSchemaBody,
  checkDelayQuery,
  catchError(async (req, res) => {
    const schema = req.schema;
    const delay = req.delay;

    await delayRes(delay);
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

router.post(
  "/random",
  checkSchemaBody,
  catchError(async (req, res) => {
    const schema = req.schema;
    const randomDelay = Math.random() * 30000;

    await delayRes(randomDelay);

    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

export default router;
