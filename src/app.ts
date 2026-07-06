import express from "express";
import cors from "cors";
import delay from "./routes/delay.js";
import status from "./routes/status.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200,
  }),
);

app.use("/api/delay", delay);

app.use("/api/status", status);

app.get("/", (req, res) => {
  res.json("Health Check Complete");
});

app.use((req, res, next) => {
  res.send("<h1>Status 404: Endpoint Not Found</h1>");
});

app.listen(3000, () => {
  console.log(`Jumble API is listening to port ${port}...`);
});
