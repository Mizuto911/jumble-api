import { type Request, type Response, type NextFunction } from "express";
import {
  isValidStatusCode,
  convertDelayValueToMS,
  parseOptionQuery,
} from "../utilities.js";
import { schemasCollection } from "../server.js";
import validateSchema from "../validator.js";

export const checkStatusCode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = req.params.status as string;

  if (!isValidStatusCode(status)) {
    return res
      .status(400)
      .json({ success: false, msg: `Status code ${status} is invalid.` });
  }

  req.status = status;
  next();
};

export const checkSchemaInQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

  req.schemaID = schemaID as string;
  req.schema = schema;
  next();
};

export const checkSchemaInParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schemaID = req.params.schemaID;

  const schema = schemaID
    ? schemasCollection.get(schemaID as string)
    : undefined;

  if (!schema && schemaID) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  req.schemaID = schemaID as string;
  req.schema = schema;
  next();
};

export const checkSchemaInParamsNotExist = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schemaID = req.params.schemaID;

  if (!schemasCollection.has(schemaID as string)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  req.schemaID = schemaID as string;
  next();
};

export const checkSchemaBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = req.body;

  if (!validateSchema(schema)) {
    return res.status(422).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  req.schema = schema;
  next();
};

export const checkSchemaCreate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schemaCreate: SchemaCreateRequest = req.body;

  if (!schemaCreate.schemaID) {
    return res.status(400).json({
      success: false,
      msg: "Provide a schema ID for your schema.",
    });
  }

  if (!schemaCreate.schema) {
    return res.status(400).json({
      success: false,
      msg: "Provide a schema for your schema key.",
    });
  }

  if (!validateSchema(schemaCreate.schema)) {
    return res.status(422).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  if (schemasCollection.has(schemaCreate.schemaID)) {
    return res.status(409).json({
      success: false,
      msg: `Schema with id '${schemaCreate.schemaID}' already exists.`,
    });
  }

  req.schemaCreate = schemaCreate;
  next();
};

export const checkDelayQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  req.delay = delay;
  next();
};

export const checkJumbleOptionQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { missing, wrongType, malformed, probability } = req.query;

  try {
    req.options = parseOptionQuery({
      missing,
      wrongType,
      malformed,
      probability,
    } as Record<string, string>);
    next();
  } catch (e) {
    res.status(400).json({
      success: false,
      msg: (e as Error).message,
    });
  }
};
