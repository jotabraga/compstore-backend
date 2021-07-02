import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";

describe("POST /api/cart", () => {
    it("returns status 201 for valid params", async () => {
      const result = await supertest(app)
        .post("/api/cart")
        .send({  });
      expect(result.status).toEqual(201);
    });
  
    it("returns status 400 for empty email", async () => {
      const result = await supertest(app)
        .post("/api/login")
        .send({ email: "", password: "12345678" });
      expect(result.status).toEqual(400);
    });
  
    it("returns status 400 for invalid password", async () => {
      const result = await supertest(app)
        .post("/api/login")
        .send({ email: "loginjest@jest.br", password: null });
      expect(result.status).toEqual(400);
    });
  
    it("returns status 400 for empty password", async () => {
      const result = await supertest(app)
        .post("/api/login")
        .send({ email: "loginjest@jest.br", password: "" });
      expect(result.status).toEqual(400);
    });
  });