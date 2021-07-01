import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function products(req, res) {
  try {
    
    const result = await connectionDB.query(`SELECT * FROM products`);

    if (result.rowCount === 0) return res.sendStatus(409);

    res.send(result.rows);
  } catch (e) {
    errorHandler(e, res);
  }
}
