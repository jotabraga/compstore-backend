import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function getCart(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace('Bearer ', "");
  try {
    const result = await connectionDB.query(
      `SELECT * FROM cart
      WHERE token = $1`,[token]
      
    );
    
    if (result.rowCount === 0) return res.send([]);
    
    res.send(result.rows);
  } catch (e) {
    errorHandler(e, res);
  }
}