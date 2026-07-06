import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const schema = req.body;
  res.json(schema);
});

export default router;
