import express from "express";
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

export default router;
