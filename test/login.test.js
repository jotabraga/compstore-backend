import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";

beforeAll(async () => {
  await connectionDB.query(
    `INSERT INTO users (name, cpf, email, hash) 
    VALUES ('Jest', 01509083006, 'loginjest@jest.br','$2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC')`
  );
});

afterAll(async () => {
  const result = await connectionDB.query(
    `SELECT sessions.token 
      FROM sessions JOIN users 
      ON users.id = sessions."userId" 
      WHERE email = 'loginjest@jest.br'`
  );
  const token = result.rows[0]?.token;
  await connectionDB.query(
    `DELETE FROM users WHERE email = 'loginjest@jest.br'`
  );
  await connectionDB.query(`DELETE FROM sessions WHERE token = $1`, [token]);
  connectionDB.end();
});

describe("POST /api/login", () => {
  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: null, password: "12345678" });
    expect(result.status).toEqual(400);
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

  it("returns status 400 for password length greater than 100", async () => {
    const result = await supertest(app).post("/api/login").send({
      email: "newjest@jest.br",
      password:
        "123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678",
    });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length less than 8", async () => {
    const result = await supertest(app).post("/api/login").send({
      email: "newjest@jest.br",
      password: "1234567",
    });
    expect(result.status).toEqual(400);
  });

  it("returns status 404 for not existent params", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "notjest@jest.br", password: "12345678" });
    expect(result.status).toEqual(404);
  });

  it("returns status 200 for valid params", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "loginjest@jest.br", password: "12345678" });
    expect(result.status).toEqual(200);
  });
});
