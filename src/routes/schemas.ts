import express from "express";
import validateSchema from "../validator.js";
import { schemaIDExist } from "../utilities.js";
import { schemasCollection } from "../app.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: schemasCollection });
});

router.get("/:schemaID", (req, res) => {
  const schemaID = req.params.schemaID;
  if (!schemaIDExist(schemaID) || schemasCollection === undefined) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }
  res.status(200).json({ success: true, data: schemasCollection[schemaID] });
});

router.post("/", (req, res) => {
  const schemaCreate: SchemaCreateRequest = req.body;
  if (!validateSchema(schemaCreate.schema)) {
    return res.status(422).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  if (!schemaCreate.schemaID) {
    return res.status(400).json({
      success: false,
      msg: "Provide a schema key for your schema.",
    });
  }

  if (schemaIDExist(schemaCreate.schemaID)) {
    return res.status(409).json({
      success: false,
      msg: `Schema with id '${schemaCreate.schemaID}' already exists.`,
    });
  }

  schemasCollection[schemaCreate.schemaID] = schemaCreate.schema;

  res.status(201).json({ success: true, data: schemaCreate.schema });
});

router.delete("/:schemaID", (req, res) => {
  const schemaID = req.params.schemaID;
  if (!schemaIDExist(schemaID) || schemasCollection === undefined) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }
  delete schemasCollection[schemaID];
  res.status(204).send();
});

router.put("/", (req, res) => {
  const schemaCreate: SchemaCreateRequest = req.body;
  if (!validateSchema(schemaCreate.schema)) {
    return res.status(422).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  if (!schemaCreate.schemaID) {
    return res.status(400).json({
      success: false,
      msg: "Provide a schema key for your schema.",
    });
  }

  if (!schemaIDExist(schemaCreate.schemaID)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaCreate.schemaID}' does not exist.`,
    });
  }

  schemasCollection[schemaCreate.schemaID] = schemaCreate.schema;

  res.status(201).json({ success: true, data: schemaCreate.schema });
});

export default router;
