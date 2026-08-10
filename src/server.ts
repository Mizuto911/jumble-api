import express from "express";
import cors from "cors";
import delay from "./routes/delay.js";
import status from "./routes/status.js";
import schema from "./routes/schemas.js";
import jumble from "./routes/jumble.js";
import SchemasCollection from "./SchemasCollection.js";

export let schemasCollection: SchemasCollection;

export default function createApp(port: number, schemas?: SchemaCollection) {
  schemasCollection = new SchemasCollection(schemas);

  const app = express();

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
  app.use("/api/jumble", jumble);

  app.get("/", (req, res) => {
    res.json("Health Check Complete");
  });

  app.use((req, res) => {
    res.send("<h1>Status 404: Endpoint Not Found</h1>");
  });

  return app;
}
