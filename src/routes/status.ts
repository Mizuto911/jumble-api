import express from "express";
import { getRandomStatusCode } from "../utilities.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { schemasCollection } from "../server.js";
import { catchError } from "../middleware/wrapper.js";
import {
  checkStatusCode,
  checkSchemaInQuery,
  checkSchemaBody,
} from "../middleware/validator.js";

const router = express.Router();

router.get(
  "/random",
  checkSchemaInQuery,
  catchError((req, res) => {
    const schema = req.schema;
    return res.status(getRandomStatusCode()).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

router.get(
  "/:status",
  checkStatusCode,
  checkSchemaInQuery,
  catchError((req, res) => {
    const status = req.status;
    const schema = req.schema;
    return res.status(Number(status)).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

router.post(
  "/random",
  checkSchemaBody,
  catchError((req, res) => {
    const schema = req.schema;
    return res.status(getRandomStatusCode()).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

router.post(
  "/:status",
  checkStatusCode,
  checkSchemaBody,
  catchError((req, res) => {
    const schema = req.schema;
    const status = req.status;
    return res.status(Number(status)).json({
      success: true,
      data: generateOutputFromSchema(schema ?? schemasCollection.default),
    });
  }),
);

export default router;
