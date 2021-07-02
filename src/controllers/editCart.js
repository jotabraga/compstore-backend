import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function editCart(req, res) {
  try {

    const { newAmount, token, productId } = req.body;


    if(!token) return res.sendStatus(409);

    const result = await connectionDB.query(
      `UPDATE cart 
      SET amount = $1 WHERE "productId" = $2 AND token = $3`,
      [newAmount, productId, token]
    );

    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}
