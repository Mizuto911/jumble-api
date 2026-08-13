import express from "express";
import {
  checkDelayQuery,
  checkSchemaBody,
  checkSchemaInQuery,
} from "../middleware/validator.js";
import {
  getDelay,
  getRandomDelay,
  postDelay,
  postRandomDelay,
} from "../controllers/delay.js";

const router = express.Router();

router.get("/", checkSchemaInQuery, checkDelayQuery, getDelay);
router.get("/random", checkSchemaInQuery, getRandomDelay);
router.post("/", checkSchemaBody, checkDelayQuery, postDelay);
router.post("/random", checkSchemaBody, postRandomDelay);

export default router;
