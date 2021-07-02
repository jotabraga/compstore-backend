import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function deleteCart(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace('Bearer ', "");
  const productId = req.params.id
  try {

    

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
