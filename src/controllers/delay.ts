import { catchError } from "../middleware/wrapper.js";
import generateOutputFromSchema from "../SchemaOutput.js";
import { schemasCollection } from "../server.js";

const delayRes = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getDelay = catchError(async (req, res) => {
  const delay = req.delay;
  const schema = req.schema;
  const data = generateOutputFromSchema(schema ?? schemasCollection.default);

  await delayRes(delay);
  return res.status(200).json({
    success: true,
    data: data,
  });
});

export const getRandomDelay = catchError(async (req, res) => {
  const schema = req.schema;
  const randomDelay = Math.random() * 30000;

  await delayRes(randomDelay);
  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});

export const postDelay = catchError(async (req, res) => {
  const schema = req.schema;
  const delay = req.delay;

  await delayRes(delay);
  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});

export const postRandomDelay = catchError(async (req, res) => {
  const schema = req.schema;
  const randomDelay = Math.random() * 30000;

  await delayRes(randomDelay);

  return res.status(200).json({
    success: true,
    data: generateOutputFromSchema(schema ?? schemasCollection.default),
  });
});
