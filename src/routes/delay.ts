import express from "express";
import { convertDelayValueToMS } from "../utilities.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query: delayQuery = req.query;
  const value = query.value ?? 5000;
  const units = query.value ? (query.units ?? "ms") : "ms";
  const delay = convertDelayValueToMS(value, units);

  setTimeout(() => {
    res.json({ msg: "Here is the response." });
  }, delay);
});

export default router;
