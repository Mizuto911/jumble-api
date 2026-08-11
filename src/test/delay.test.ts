import createApp from "../server.js";
import testSchemas from "./testing_schemas/testSchemas.js";
import invalidSchema from "./testing_schemas/invalidSchema.js";
import request from "supertest";
import { describe, it, expect, vi } from "vitest";

vi.setConfig({ testTimeout: 8000 });

const app = createApp(3030, testSchemas);

describe("GET /api/delay", () => {
  describe("given that no value, unit, and schemaID is passed in the query", () => {
    it("should respond with 200 status code and return default schema data after 5 seconds", async () => {
      const response = await request(app).get("/api/delay");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("given a value and unit is passed, and no schemaID is passed in the query", () => {
    it("should respond with 200 status code and return default schema data after 500ms", async () => {
      const response = await request(app).get("/api/delay?value=500&units=ms");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 200 status code and return default schema data after 0.5s", async () => {
      const response = await request(app).get("/api/delay?value=0.5&units=s");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 200 status code and return default schema data after 500ns", async () => {
      const response = await request(app).get("/api/delay?value=500&units=ns");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 200 status code and return default schema data after 500us", async () => {
      const response = await request(app).get("/api/delay?value=500&units=us");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid delay value error", async () => {
      const response = await request(app).get(
        "/api/delay?value=one-hundred&units=ms",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid unit error", async () => {
      const response = await request(app).get("/api/delay?value=100&units=msi");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given that a value, unit, and schemaID is passed in the query", () => {
    it("should respond with 200 status code and return the generated data associated with the schemaID", async () => {
      const response = await request(app).get(
        "/api/delay?value=2&schemaID=userAdmin",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 404 status code and return schema not found error", async () => {
      const response = await request(app).get(
        "/api/delay?value=2&schemaID=someSchema",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app).get(
        "/api/delay?value=2&schemaID=invalidRange",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("POST /api/delay", () => {
  describe("given that no schema is passed in the body", () => {
    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app).post("/api/delay");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given that a schema is passed in the body", () => {
    it("should respond with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/delay?value=2")
        .send(testSchemas.userAdmin)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app)
        .post("/api/delay?value=2")
        .send(invalidSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app)
        .post("/api/delay?value=2")
        .send(testSchemas.invalidRange)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid delay value error", async () => {
      const response = await request(app)
        .post("/api/delay?value=two")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid delay value error", async () => {
      const response = await request(app)
        .post("/api/delay?value=2&units=cm")
        .send(testSchemas.testSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});
