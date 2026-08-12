import express from "express";
import { schemasCollection } from "../server.js";
import {
  checkSchemaBody,
  checkSchemaInParams,
  checkSchemaInParamsNotExist,
  checkSchemaCreate,
} from "../middleware/validator.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: schemasCollection.getAll() });
});

router.get("/:schemaID", checkSchemaInParams, (req, res) => {
  const schema = req.schema;
  res.status(200).json({ success: true, data: schema });
});

router.post("/", checkSchemaCreate, (req, res) => {
  const schemaCreate = req.schemaCreate;
  schemasCollection.add(schemaCreate.schemaID, schemaCreate.schema);
  res.status(201).json({ success: true, data: schemaCreate.schema });
});

router.delete("/:schemaID", checkSchemaInParams, (req, res) => {
  const schemaID = req.schemaID as string;
  schemasCollection.delete(schemaID);
  res.status(204).send();
});

router.put(
  "/:schemaID",
  checkSchemaInParamsNotExist,
  checkSchemaBody,
  (req, res) => {
    const schema = req.schema as Schema;
    const schemaID = req.schemaID as string;
    schemasCollection.update(schemaID, schema);
    res.status(200).json({ success: true, data: schema });
  },
);

export default router;
