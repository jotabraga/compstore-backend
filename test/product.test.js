import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";

beforeAll(async () => {
    await connectionDB.query(`SELECT * from products)`
    );
  });

describe("GET /api/products", () => {
    it("returns status 200 for valid params", async () => {
      const result = await supertest(app)
        .get("/api/products")
        .send({  });
      expect(result.status).toEqual(200);
    });

  
