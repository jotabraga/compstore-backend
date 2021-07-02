import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";

beforeAll(async () => {
    await connectionDB.query(
      `INSERT INTO sessions ("userId", token) 
      VALUES (15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJMb2dvdXQiLCJpYXQiOjE2MjUyNDAxMzcsImV4cCI6MTYyNzgzMjEzN30.PslH45dHCS0LGmQt2OlkWvwgH-3wgBF-Yz5e4qGnEDI')`
    );
});

describe("POST /api/login", () => {
  it("returns status 200 for valid token", async () => {
    const result = await supertest(app)
      .delete("/api/logout")
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJMb2dvdXQiLCJpYXQiOjE2MjUyNDAxMzcsImV4cCI6MTYyNzgzMjEzN30.PslH45dHCS0LGmQt2OlkWvwgH-3wgBF-Yz5e4qGnEDI')
    expect(result.status).toEqual(200);
  });
});