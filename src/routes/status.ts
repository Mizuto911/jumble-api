import express from "express";
import { isValidStatusCode } from "../utilities.js";

const router = express.Router();

router.get("/:status", (req, res) => {
  const status: string | undefined = req.params.status;
  if (!isValidStatusCode(status)) {
    return res
      .status(400)
      .json({ success: false, msg: `Status code ${status} is invalid.` });
  }
  return res
    .status(Number(status))
    .json({ success: true, data: { msg: "This is success!" } });
});

export default router;
