import jwt from 'jsonwebtoken';

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function deleteCart(req, res) {

  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const {userId} = jwt.verify(token, secret)
    const productId = req.params.id
    if (!userId) return res.sendStatus(401);

    await connectionDB.query(
      `DELETE FROM cart 
      WHERE "productId" = $1 AND "userId" = $2`,
      [productId, userId]
    );

    res.sendStatus(200);
  } catch (e) {
    errorHandler(e, res);
  }
}
