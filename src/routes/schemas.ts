import express from "express";
import {
  checkSchemaBody,
  checkSchemaInParams,
  checkSchemaInParamsNotExist,
  checkSchemaCreate,
} from "../middleware/validator.js";
import {
  getSchemas,
  getSchema,
  postSchema,
  deleteSchema,
  updateSchema,
} from "../controllers/schemas.js";

const router = express.Router();

router.get("/", getSchemas);
router.get("/:schemaID", checkSchemaInParams, getSchema);
router.post("/", checkSchemaCreate, postSchema);
router.delete("/:schemaID", checkSchemaInParams, deleteSchema);
router.put(
  "/:schemaID",
  checkSchemaInParamsNotExist,
  checkSchemaBody,
  updateSchema,
);

export default router;
