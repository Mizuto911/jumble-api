import express from "express";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { getRandomTrueOrFalse, randomOptionQuery } from "../utilities.js";
import {
  checkJumbleOptionQuery,
  checkSchemaBody,
  checkSchemaInQuery,
} from "../middleware/validator.js";
import { catchError } from "../middleware/wrapper.js";

const router = express.Router();

router.get(
  "/",
  checkSchemaInQuery,
  checkJumbleOptionQuery,
  catchError((req, res) => {
    const options = req.options;
    const schema = req.schema;
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  }),
);

router.post(
  "/",
  checkSchemaBody,
  checkJumbleOptionQuery,
  catchError((req, res) => {
    const schema = req.schema;
    const options = req.options;
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  }),
);

router.get(
  "/random",
  checkSchemaInQuery,
  catchError((req, res) => {
    const schema = req.schema;
    const options = randomOptionQuery();
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  }),
);

router.post(
  "/random",
  checkSchemaBody,
  catchError((req, res) => {
    const schema = req.schema;
    const options = randomOptionQuery();
    return res.status(200).json({
      success: true,
      data: generateOutputFromSchema(
        schema ?? schemasCollection.default,
        options,
      ),
    });
  }),
);

export default router;
