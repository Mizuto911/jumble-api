import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json("Health Check Complete");
});

app.listen(3000, () => {
  console.log(`Jumble API is listening to port ${port}...`);
});
