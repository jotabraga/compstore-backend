import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function createCart(req, res) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', "");
    const {id, amount } = req.body;

    if (!token) return res.sendStatus(409);

    const result = await connectionDB.query(
      `SELECT * FROM products 
      WHERE id = $1`,
      [id]
    );
    
    if (result.rowCount === 0) return res.sendStatus(404);

    const product = result.rows[0];
    const { description, image, price, categoryId } = product;
    

    await connectionDB.query(
      `INSERT INTO cart ("productId",description,image,price,"categoryId", token, amount) 
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [id, description, image, price, categoryId, token, amount ]
    );
    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}

