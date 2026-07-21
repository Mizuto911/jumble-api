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
    array: 3,
    properties: {
      name: "fullname",
      address: "address",
      isFemale: "boolean",
      phone: "phone",
      email: "email",
      userType: {
        pickFrom: ["admin", "user"],
      },
      friends: {
        array: { min: 3, max: 5 },
        properties: {
          name: "fullname",
          address: "address",
          isFemale: "boolean",
          phone: "phone",
          email: "email",
          userType: {
            pickFrom: ["admin", "user"],
          },
        },
      },
    },
  };

  res.status(200).json(generateOutputFromSchema(schema));
});

export default router;
