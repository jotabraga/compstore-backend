import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function register(req, res) {
  try {

    const { token, id } = req.body;

    if (!token) return res.sendStatus(409);

    const result = await connectionDB.query(
      `SELECT * FROM products 
      WHERE id = $1`,
      [id]
    );
    
    if (result.rowCount === 0) return res.sendStatus(409);

    const product = result.rows[0];
    const { description, image, price, categoryId } = product;

    await connectionDB.query(
      `INSERT INTO cart (description,image,price,categoryId, token) 
      VALUES ($1,$2,$3,$4)`,
      [description, image, price, categoryId, token]
    );
    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}

