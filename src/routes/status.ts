import express from "express";
import {
  checkStatusCode,
  checkSchemaInQuery,
  checkSchemaBody,
} from "../middleware/validator.js";
import {
  getRandomStatus,
  getStatus,
  postRandomStatus,
  postStatus,
} from "../controllers/status.js";

const router = express.Router();

router.get("/random", checkSchemaInQuery, getRandomStatus);
router.get("/:status", checkStatusCode, checkSchemaInQuery, getStatus);
router.post("/random", checkSchemaBody, postRandomStatus);
router.post("/:status", checkStatusCode, checkSchemaBody, postStatus);

export default router;
