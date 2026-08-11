import createApp from "../server.js";
import testSchemas from "./testing_schemas/testSchemas.js";
import invalidSchema from "./testing_schemas/invalidSchema.js";
import request from "supertest";
import { describe, it, expect } from "vitest";

const app = createApp(3030, testSchemas);

describe("GET /api/schema", () => {
  it("should respond with 200 status code and return all the schema in the collection", async () => {
    const response = await request(app).get("/api/schema");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/schema/:schemaID", () => {
  it("should respond with 200 status code and return the schema associated with the schemaID", async () => {
    const response = await request(app).get("/api/schema/userAdmin");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("data");
  });

  it("should respond with 404 status code and return schema not found error", async () => {
    const response = await request(app).get("/api/schema/userAdm");
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty("msg");
  });
});

describe("POST /api/schema", () => {
  describe("given a Schema Create Data in the body containing both schema and schemaID", () => {
    it("should respond with 201 status code and return the schema as response data", async () => {
      const newSchema = { name: "fullname" };
      const response = await request(app)
        .post("/api/schema")
        .send({
          schemaID: "newSchema",
          schema: newSchema,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(newSchema);
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app)
        .post("/api/schema")
        .send({
          schemaID: "newSchema",
          schema: invalidSchema,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 409 status code and return schema already exists error", async () => {
      const newSchema = { name: "fullname" };
      const response = await request(app)
        .post("/api/schema")
        .send({
          schemaID: "newSchema",
          schema: newSchema,
        })
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given a Schema Create Data in the body containing only the schema", () => {
    it("should respond with 400 status code and return schemaID not provided error", async () => {
      const newSchema = { name: "fullname" };
      const response = await request(app)
        .post("/api/schema")
        .send({ schema: newSchema })
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given a Schema Create Data in the body containing only the schemaID", () => {
    it("should respond with 400 status code and return schema not provided error", async () => {
      const response = await request(app)
        .post("/api/schema")
        .send({ schemaID: "onlySchemaID" })
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("PUT /api/schema/:schemaID", () => {
  describe("given a schema in the body and schemaID provided in the params", () => {
    it("should respond with 200 status code and return the updated data associated with the schemaID", async () => {
      const newSchema = { name: "fullname", sex: "sex" };
      const response = await request(app)
        .put("/api/schema/newSchema")
        .send(newSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(newSchema);
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app)
        .put("/api/schema/newSchema")
        .send(invalidSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 404 status code and return schemaID not found error", async () => {
      const newSchema = { name: "fullname", sex: "sex" };
      const response = await request(app)
        .put("/api/schema/aDifferentSchema")
        .send(newSchema)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });

  describe("given a schemaID provided in the params and no schema provided in the body", () => {
    it("should respond with 404 status code and return schemaID not found error", async () => {
      const response = await request(app).put("/api/schema/aDifferentSchema");
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });

    it("should respond with 422 status code and return invalid schema error", async () => {
      const response = await request(app).put("/api/schema/newSchema");
      expect(response.statusCode).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("msg");
    });
  });
});

describe("DELETE /api/schema/:schemaID", () => {
  it("should respond with 204 status code and return no body", async () => {
    const response = await request(app).delete("/api/schema/newSchema");
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should respond with 404 status code and return schema not found error", async () => {
    const response = await request(app).delete("/api/schema/someSchema");
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty("msg");
  });
});
