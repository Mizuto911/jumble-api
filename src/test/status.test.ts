import createApp from "../server.js";
import testSchemas from "./testSchemas.js";
import request from "supertest";
import invalidSchema from "./invalidSchema.js";
import { describe, it, expect } from "vitest";
import { STATUS_CODES } from "node:http";

const app = createApp(3030, testSchemas);
const statusCodes = Object.keys(STATUS_CODES);
const specialStatusCodes = [100, 101, 102, 103, 204, 205, 304];

const isEmptyOrFalsey = (val: any) => {
  if (!val) return true;
  return Object.keys(val).length === 0 && val.constructor === Object;
};

describe("GET /api/status/:status", () => {
  describe("given a certain status code as params", () => {
    it("should respond with a 200 status code and return default schema data", async () => {
      const response = await request(app).get("/api/status/200");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 201 status code and return default schema data", async () => {
      const response = await request(app).get("/api/status/201");
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 400 status code and return default schema data", async () => {
      const response = await request(app).get("/api/status/400");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 404 status code and return default schema data", async () => {
      const response = await request(app).get("/api/status/404");
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 500 status code and return default schema data", async () => {
      const response = await request(app).get("/api/status/500");
      expect(response.statusCode).toBe(500);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with a 400 status code and return invalid status code error", async () => {
      const response = await request(app).get("/api/status/550");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
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

    it("should respond with a 404 status code and return schema not found error", async () => {
      const response = await request(app).get(
        "/api/status/404?schemaID=schemaThatDoesntExist",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with a 400 status code and return invalid range error message", async () => {
      const response = await request(app).get(
        "/api/status/500?schemaID=invalidRange",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with a 400 status code and return invalid status code error", async () => {
      const response = await request(app).get(
        "/api/status/550?schemaID=invalidRange",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("POST /api/status/:status", () => {
  describe("given a certain status code as params and schema as body", () => {
    it("should respond with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/status/200")
        .send(testSchemas.testSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/status/400")
        .send(testSchemas.testSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app)
        .post("/api/status/200")
        .send(invalidSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app)
        .post("/api/status/200")
        .send(testSchemas.invalidRange)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with a 400 status code and return invalid status code error", async () => {
      const response = await request(app)
        .post("/api/status/550")
        .send(testSchemas.userAdmin)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given a certain status code as params and no schema passed in body", () => {
    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app).post("/api/status/200");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app).post("/api/status/600");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("GET /api/status/random", () => {
  describe("given no schemaID as query", () => {
    it("should respond with a random status code and return default schema data", async () => {
      const response = await request(app).get("/api/status/random");
      expect(statusCodes).toContain(String(response.statusCode));

      if (specialStatusCodes.includes(response.statusCode)) {
        expect(response.body).toSatisfy(isEmptyOrFalsey);
      } else {
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty("data");
      }
    });
  });

  describe("given a certain schemaID as query", () => {
    it("should respond with a random status code and return generated data", async () => {
      const response = await request(app).get(
        "/api/status/random?schemaID=userAdmin",
      );
      expect(statusCodes).toContain(String(response.statusCode));

      if (specialStatusCodes.includes(response.statusCode)) {
        expect(response.body).toSatisfy(isEmptyOrFalsey);
      } else {
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty("data");
      }
    });

    it("should respond 404 status code and return schema not found error", async () => {
      const response = await request(app).get(
        "/api/status/random?schemaID=userAdmdw",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond 400 status code and return invalid range error", async () => {
      const response = await request(app).get(
        "/api/status/random?schemaID=invalidRange",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("POST /api/status/random", () => {
  describe("given a schema passed in body", () => {
    it("should respond with a random status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/status/random")
        .send(testSchemas.userAdmin)
        .set("Accept", "application/json");
      expect(statusCodes).toContain(String(response.statusCode));

      if (specialStatusCodes.includes(response.statusCode)) {
        expect(response.body).toSatisfy(isEmptyOrFalsey);
      } else {
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty("data");
      }
    });

    it("should respond 422 status code and return invalid schema error", async () => {
      const response = await request(app)
        .post("/api/status/random")
        .send(invalidSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond 400 status code and return invalid range error", async () => {
      const response = await request(app)
        .post("/api/status/random")
        .send(testSchemas.invalidRange)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});
