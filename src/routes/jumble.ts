import express from "express";
import {
  checkJumbleOptionQuery,
  checkSchemaBody,
  checkSchemaInQuery,
} from "../middleware/validator.js";
import {
  getJumble,
  postJumble,
  getRandomJumble,
  postRandomJumble,
} from "../controllers/jumble.js";

const router = express.Router();

router.get("/", checkSchemaInQuery, checkJumbleOptionQuery, getJumble);
router.post("/", checkSchemaBody, checkJumbleOptionQuery, postJumble);
router.get("/random", checkSchemaInQuery, getRandomJumble);
router.post("/random", checkSchemaBody, postRandomJumble);

export default router;
