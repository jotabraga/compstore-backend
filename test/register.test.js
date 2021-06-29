import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";

afterAll(async () => {
  await connectionDB.query(`DELETE FROM users WHERE email = 'newjest@jest.br'`);
  connectionDB.end();
});

describe("POST /api/register", () => {

  it("returns status 400 for invalid name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: null,
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for name length less than 3", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "Ne",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for name length greater than 30", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJestNewJestNewJestNewJestNewJest",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for name length less than 3", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "Ne",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for invalid cpf", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "newjest@jest.br",
        cpf: "00000000000",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty cpf", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "newjest@jest.br",
        cpf: "",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: null,
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty email", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "",
        cpf: "19144600062",
        password: "12345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for invalid password", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: null,
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty password", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length greater than 100", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length less than 8", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({
        name: "NewJest",
        email: "newjest@jest.br",
        cpf: "19144600062",
        password: "1234567",
      });
    expect(result.status).toEqual(400);
  });

  it("returns status 201 for valid params", async () => {
    const result = await supertest(app).post("/api/register").send({
      name: "NewJest",
      cpf: "19144600062",
      email: "newjest@jest.br",
      password: "12345678"
    });
    expect(result.status).toEqual(201);
  });

  it("returns status 409 for existent params", async () => {
    const result = await supertest(app).post("/api/register").send({
      name: "NewJest",
      email: "newjest@jest.br",
      cpf: "19144600062",
      password: "12345678"
    });
    expect(result.status).toEqual(409);
  });

});
