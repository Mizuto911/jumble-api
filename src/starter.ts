import express from "express";
import cors from "cors";
import delay from "./routes/delay.js";
import status from "./routes/status.js";
import schema from "./routes/schemas.js";

const app = express();

export default function startApp(port: number) {
  app.use(
    cors({
      origin: `http://localhost:${port}`,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(express.json());

  app.use("/api/delay", delay);
  app.use("/api/status", status);
  app.use("/api/schema", schema);

  app.get("/", (req, res) => {
    res.json("Health Check Complete");
  });

  app.use((req, res, next) => {
    res.send("<h1>Status 404: Endpoint Not Found</h1>");
  });

  app.listen(port, () => {
    console.log(`Jumble API is listening to port ${port}...`);
  });
}
