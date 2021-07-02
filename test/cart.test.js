import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";


beforeAll(async () => {
    await connectionDB.query(
      `INSERT INTO users (name, cpf, email, hash) 
      VALUES ('Jest', 01509083006, 'loginjest@jest.br','$2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC')`
    );
  });

describe("POST /api/cart", () => {
    it("returns status 201 for valid params", async () => {
      const result = await supertest(app)
        .post("/api/cart")
        .set('Authorization','bearer $2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC')
        .send({ id: 1, amount:1, token:"$2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC" });
      expect(result.status).toEqual(201);
    });
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