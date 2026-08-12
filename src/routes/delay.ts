import express from "express";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import {
  checkDelayQuery,
  checkSchemaBody,
  checkSchemaInQuery,
} from "../middleware/validator.js";

const router = express.Router();

router.get("/", checkSchemaInQuery, checkDelayQuery, (req, res) => {
  const delay = req.delay;
  const schema = req.schema;

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

router.get("/random", checkSchemaInQuery, (req, res) => {
  const schema = req.schema;
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

router.post("/", checkSchemaBody, checkDelayQuery, (req, res) => {
  const schema = req.schema;
  const delay = req.delay;

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

router.post("/random", checkSchemaBody, (req, res) => {
  const schema = req.schema;
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
