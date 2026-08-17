import { describe, it, expect } from "vitest";
import testSchemas from "./testing_schemas/testSchemas.js";
import invalidSchema from "./testing_schemas/invalidSchema.js";
import createApp from "../server.js";
import request from "supertest";

const app = createApp(testSchemas);

describe("GET /api/jumble", () => {
  describe("given options passed in the query", () => {
    it("should respond with 200 status code and return default schema data", async () => {
      const response = await request(app).get("/api/jumble?malformed=1");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get("/api/jumble?malformed=2");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return default schema data", async () => {
      const response = await request(app).get("/api/jumble?missing=1");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get("/api/jumble?missing=8");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return default schema data", async () => {
      const response = await request(app).get("/api/jumble?wrongType=1");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get("/api/jumble?wrongType=4");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return default schema data", async () => {
      const response = await request(app).get(
        "/api/jumble?wrongType=1&malformed=1&missing=1",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get(
        "/api/jumble?wrongType=1&malformed=101&missing=1",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return the generated data", async () => {
      const response = await request(app).get(
        "/api/jumble?wrongType=1&probability=0.5",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get(
        "/api/jumble?wrongType=1&probability=1.5",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given that no options are passed in the query", () => {
    it("should respond with 200 status code and return default schema data", async () => {
      const response = await request(app).get("/api/jumble");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("given options passed in the query and schemaID passed in the query", () => {
    it("should respond with 200 status code and return the generated data", async () => {
      const response = await request(app).get(
        "/api/jumble?schemaID=userAdmin&missing=1",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 404 status code and return schema not found error", async () => {
      const response = await request(app).get(
        "/api/jumble?schemaID=randomSchema&missing=1",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get(
        "/api/jumble?schemaID=userSchema&missing=8",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app).get(
        "/api/jumble?schemaID=invalidRange&missing=1",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return the generated data", async () => {
      const response = await request(app).get(
        "/api/jumble?wrongType=1&probability=0.5&schemaID=userSchema",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app).get(
        "/api/jumble?wrongType=1&probability=1.5&schemaID=userSchema",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("GET /api/jumble/random", () => {
  describe("given that there is no schemaID passed in the query", () => {
    it("should respond with 200 status code and return the default schema data", async () => {
      const response = await request(app).get("/api/jumble/random");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("given that a schemaID has been passed in the query", () => {
    it("should respond with 200 status code and return the generated schema data associated with the schemaID", async () => {
      const response = await request(app).get(
        "/api/jumble/random?schemaID=userAdmin",
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 404 status code and return schema not found error", async () => {
      const response = await request(app).get(
        "/api/jumble/random?schemaID=someSchema",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app).get(
        "/api/jumble/random?schemaID=invalidRange",
      );
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("POST /api/jumble", () => {
  describe("given a schema that is passed in the body and options passed in the query", () => {
    it("should respond with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/jumble?wrongType=1")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app)
        .post("/api/jumble?wrongType=123")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/jumble?malformed=1")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app)
        .post("/api/jumble?malformed=123")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/jumble?missing=1")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app)
        .post("/api/jumble?missing=123")
        .send(testSchemas.userSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app)
        .post("/api/jumble?wrongType=1")
        .send(invalidSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app)
        .post("/api/jumble?wrongType=1")
        .send(testSchemas.invalidRange)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 200 status code and return the generated data", async () => {
      const response = await request(app)
        .post("/api/jumble?wrongType=1&probability=0.5")
        .send(testSchemas.userAdmin)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 400 status code and return invalid options error", async () => {
      const response = await request(app)
        .post("/api/jumble?wrongType=1&probability=1.5")
        .send(testSchemas.userAdmin)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given that no schema is passed in the body and options passed in the query", () => {
    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app).post("/api/jumble?wrongType=1");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("POST /api/jumble/random", () => {
  describe("given that a schema is passed in the body", () => {
    it("should respond with 200 status code and return generated data", async () => {
      const response = await request(app)
        .post("/api/jumble/random")
        .send(testSchemas.testSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
    });

    it("should respond with 422 status code and return invalid schema data", async () => {
      const response = await request(app)
        .post("/api/jumble/random")
        .send(invalidSchema)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 400 status code and return invalid range error", async () => {
      const response = await request(app)
        .post("/api/jumble/random")
        .send(testSchemas.invalidRange)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given that no schema is passed in the body", () => {
    it("should respond with 422 status code and return invalid schema data", async () => {
      const response = await request(app).post("/api/jumble/random");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});
