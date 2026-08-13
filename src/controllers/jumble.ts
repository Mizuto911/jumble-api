import { catchError } from "../middleware/wrapper.js";
import { schemasCollection } from "../server.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { randomOptionQuery } from "../utilities.js";

export const getJumble = catchError((req, res) => {
  const options = req.options;
  const schema = req.schema;
  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(
      schema ?? schemasCollection.default,
      options,
    ),
  });
});

export const postJumble = catchError((req, res) => {
  const schema = req.schema;
  const options = req.options;
  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(
      schema ?? schemasCollection.default,
      options,
    ),
  });
});

export const getRandomJumble = catchError((req, res) => {
  const schema = req.schema;
  const options = randomOptionQuery();
  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(
      schema ?? schemasCollection.default,
      options,
    ),
  });
});

export const postRandomJumble = catchError((req, res) => {
  const schema = req.schema;
  const options = randomOptionQuery();
  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(
      schema ?? schemasCollection.default,
      options,
    ),
  });
});
