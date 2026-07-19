import express from "express";
import generateOutputFromSchema from "../SchemaOutput.js";
import validateSchema from "../validator.js";
const router = express.Router();

router.get("/", (req, res) => {
  const schema = req.body;
  res.json(schema);
});

router.post("/", (req, res) => {
  const schema = req.body;
  console.log(schema, validateSchema(schema));
  if (!validateSchema(schema)) {
    return res.status(422).json({
      success: false,
      msg: "Schema that has been provided is invalid.",
    });
  }
  res.status(201).json({ success: true, data: schema });
});

router.get("/test", (req, res) => {
  const schema: Schema = {
    properties: {
      name: "fullname",
      age: {
        format: "number",
        min: 0,
        max: 100,
      },
      sex: "sex",
      friends: {
        array: 3,
        properties: {
          name: "fullname",
          age: {
            format: "number",
            min: 0,
            max: 100,
          },
          sex: "sex",
        },
      },
    },
  };

  res.status(200).json(generateOutputFromSchema(schema));
});

export default router;
