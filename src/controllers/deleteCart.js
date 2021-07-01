import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function deleteCart(req, res) {
  try {

    const { productId, token } = req.body;

    if(!token) return res.sendStatus(409);

    const result = await connectionDB.query(
      `DELETE FROM cart 
      WHERE "productId" = $1 AND token = $2`,
      [productId, token]
    );

    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}
