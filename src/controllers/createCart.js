import jwt from 'jsonwebtoken';

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function createCart(req, res) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secret)
    if (!userId) return res.sendStatus(401);
    
    const { id: productId, amount } = req.body;

    const result = await connectionDB.query(
      `SELECT * FROM products 
      WHERE id = $1`,
      [productId]
    );
    
    if (result.rowCount === 0) return res.sendStatus(404);

    const product = result.rows[0];
    const { description, image, price, categoryId } = product;
    

    await connectionDB.query(
      `INSERT INTO cart ("productId",description,image,price,"categoryId", "userId", amount) 
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [productId, description, image, price, categoryId, userId, amount ]
    );
    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}

