import app from "../src/app.js";
import supertest from "supertest";
import { connectionDB } from "../src/config/database.js";

beforeAll(async () => {
  await connectionDB.query(
    `INSERT INTO sessions ("userId",token) 
    VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhdCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ')`
  );
  await connectionDB.query(
    `INSERT INTO products 
    (description, image, price, "categoryId") 
    VALUES ('teste','https://images5.kabum.com.br/produtos/fotos/107545/processador-amd-ryzen-5-1600-cache-19mb-3-2ghz-3-6ghz-max-turbo-am4-yd1600bbafbox_1573653284_gg.jpg', 5000, 2)`
  );
});

describe("POST /api/cart", () => {
    it("returns status 201 for valid params", async () => {
      const result = await supertest(app)
        .post("/api/cart")
        .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhdCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
        .send({ id: 1, amount:1 });
      expect(result.status).toEqual(201);
    });
    it("returns status 401 for invalid token", async () => {
      const result = await supertest(app)
        .post("/api/cart")
        .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsIml1dCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
        .send({ id: 1, amount:1 });
      expect(result.status).toEqual(401);
    });
    it("returns status 404 for not existing product", async () => {
      const result = await supertest(app)
        .post("/api/cart")
        .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhdCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
        .send({ id: 2, amount:1 });
      expect(result.status).toEqual(404);
    });
 
});

describe("POST /api/edit-cart", () => {
  it("returns status 200 for valid params", async () => {
    const result = await supertest(app)
      .post("/api/edit-cart")
      .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhdCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
      .send({ newAmount: 2, productId:1 });
    expect(result.status).toEqual(200);
  });
  it("returns status 401 for invalid token", async () => {
    const result = await supertest(app)
      .post("/api/edit-cart")
      .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsIml1dCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
      .send({ newAmount:2, productId:1 });
    expect(result.status).toEqual(401);
  });
});

describe("GET /api/cart", () => {
  it("returns status 200 for valid params", async () => {
    const result = await supertest(app)
      .get("/api/cart")
      .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhdCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
    expect(result.status).toEqual(200);
  });
  it("returns status 401 for valid params", async () => {
    const result = await supertest(app)
      .get("/api/cart")
      .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhfCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
    expect(result.status).toEqual(401);
  });
  
});

describe("DELETE /api/cart/", () => {
  it("returns status 401 for invalid token", async () => {
    const result = await supertest(app)
      .delete("/api/cart/1")
      .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhfCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
    expect(result.status).toEqual(401);
  });
  it("returns status 200 for valid params", async () => {
    const result = await supertest(app)
      .delete("/api/cart/1")
      .set({"Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJsdWNhcyIsImlhdCI6MTYyNTE5MjgzOCwiZXhwIjoxNjI3Nzg0ODM4fQ.qeNF4Infhy9mSRxYtz-bjuXAicoiKwHp8odSDHFFcqQ`})
    expect(result.status).toEqual(200);
  });
  
  
});



afterAll(async ()=>{
 await connectionDB.query(
   `TRUNCATE products, sessions 
  RESTART IDENTITY`);
  connectionDB.end();

})