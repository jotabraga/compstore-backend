import jwt from 'jsonwebtoken';

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function getCart(req, res) {
  try {

    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const {userId, name} = jwt.verify(token, secret)
    if (!userId) return res.sendStatus(409);
    
    const result = await connectionDB.query(
      `SELECT * FROM cart 
      WHERE "userId" = $1`,
      [userId]
    );
    res.send(result.rows);
  } catch (e) {
    errorHandler(e, res);
  }
}