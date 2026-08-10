import createApp from "../server.js";
import testSchemas from "./testSchemas.js";
import request from "supertest";
import invalidSchema from "./invalidSchema.js";
import { describe, it, expect } from "vitest";

const app = createApp(3030, testSchemas);

describe("GET /status/:status", () => {
  describe("given a certain status code as params", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/status/200");
      expect(response.statusCode).toBe(200);
    });

    it("should respond with a 201 status code", async () => {
      const response = await request(app).get("/api/status/201");
      expect(response.statusCode).toBe(201);
    });

    it("should respond with a 400 status code", async () => {
      const response = await request(app).get("/api/status/400");
      expect(response.statusCode).toBe(400);
    });

    it("should respond with a 404 status code", async () => {
      const response = await request(app).get("/api/status/404");
      expect(response.statusCode).toBe(404);
    });

    it("should respond with a 500 status code", async () => {
      const response = await request(app).get("/api/status/500");
      expect(response.statusCode).toBe(500);
    });
  });

  describe("given a certain status code as params and schemaID as query", () => {
    it("should respond with a 200 status code and return the generated data", async () => {
      const response = await request(app).get(
        "/api/status/200?schemaID=userSchema",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 400 status code and return the generated data", async () => {
      const response = await request(app).get(
        "/api/status/400?schemaID=userAdmin",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 404 status code and return not found message", async () => {
      const response = await request(app).get(
        "/api/status/404?schemaID=schemaThatDoesntExist",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should responsd with a 400 status code and return invalid range error message", async () => {
      const response = await request(app).get(
        "/api/status/500?schemaID=invalidRange",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("POST /status/:status", () => {
  describe("given a certain status code as params and schema as body", () => {
    it("should response with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/status/200")
        .send(testSchemas.testSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should response with 400 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/status/400")
        .send(testSchemas.testSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should response with 400 status code and return invalid schema error", async () => {
      const response = await request(app)
        .post("/api/status/200")
        .send(invalidSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should response with 400 status code and return invalid range error", async () => {
      const response = await request(app)
        .post("/api/status/200")
        .send(testSchemas.invalidRange)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});
