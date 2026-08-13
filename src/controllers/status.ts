import { catchError } from "../middleware/wrapper.js";
import { getRandomStatusCode } from "../utilities.js";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";

export const getRandomStatus = catchError((req, res) => {
  const schema = req.schema;
  return res.status(getRandomStatusCode()).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});

export const getStatus = catchError((req, res) => {
  const status = req.status;
  const schema = req.schema;
  return res.status(Number(status)).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});

export const postRandomStatus = catchError((req, res) => {
  const schema = req.schema;
  return res.status(getRandomStatusCode()).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});

export const postStatus = catchError((req, res) => {
  const schema = req.schema;
  const status = req.status;
  return res.status(Number(status)).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});
