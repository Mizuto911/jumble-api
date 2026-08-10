import express from "express";
import validateSchema from "../validator.js";
import { schemasCollection } from "../server.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: schemasCollection.getAll() });
});

router.get("/:schemaID", (req, res) => {
  const schemaID = req.params.schemaID;
  const schema = schemasCollection.get(schemaID);

  if (!schema) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  res.status(200).json({ success: true, data: schema });
});

router.post("/", (req, res) => {
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

  schemasCollection.add(schemaCreate.schemaID, schemaCreate.schema);
  res.status(201).json({ success: true, data: schemaCreate.schema });
});

router.delete("/:schemaID", (req, res) => {
  const schemaID = req.params.schemaID;
  if (!schemasCollection.has(schemaID)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }
  schemasCollection.delete(schemaID);
  res.status(204).send();
});

router.put("/:schemaID", (req, res) => {
  const schema = req.body;
  const schemaID = req.params.schemaID;

  if (!schemasCollection.has(schemaID)) {
    return res.status(404).json({
      success: false,
      msg: `Schema with id '${schemaID}' does not exist.`,
    });
  }

  if (!validateSchema(schema)) {
    return res.status(422).json({
      success: false,
      msg: "Schema provided is not a valid schema format.",
    });
  }

  schemasCollection.update(schemaID, schema);
  res.status(200).json({ success: true, data: schema });
});

export default router;
