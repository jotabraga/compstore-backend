import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function categories(_, res) {
  try {
    const result = await connectionDB.query(`SELECT * FROM categories`);
    res.send(result.rows);
  } catch (e) {
    errorHandler(e, res);
  }
}