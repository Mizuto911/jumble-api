import { type Request, type Response } from "express";
import { schemasCollection } from "../server.js";

export const getSchemas = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: schemasCollection.getAll() });
};

export const getSchema = (req: Request, res: Response) => {
  const schema = req.schema;
  res.status(200).json({ success: true, data: schema });
};

export const postSchema = (req: Request, res: Response) => {
  const schemaCreate = req.schemaCreate;
  schemasCollection.add(schemaCreate.schemaID, schemaCreate.schema);
  res.status(201).json({ success: true, data: schemaCreate.schema });
};

export const deleteSchema = (req: Request, res: Response) => {
  const schemaID = req.schemaID as string;
  schemasCollection.delete(schemaID);
  res.status(204).send();
};

export const updateSchema = (req: Request, res: Response) => {
  const schema = req.schema as Schema;
  const schemaID = req.schemaID as string;
  schemasCollection.update(schemaID, schema);
  res.status(200).json({ success: true, data: schema });
};
