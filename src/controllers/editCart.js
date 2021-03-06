import jwt from 'jsonwebtoken';

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function editCart(req, res) {
  
  try {
    
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const {userId} = jwt.verify(token, secret)
  
    if (!userId) return res.sendStatus(401);
    
    const { newAmount, productId } = req.body;

    await connectionDB.query(
      `UPDATE cart 
      SET amount = $1 WHERE "productId" = $2 AND "userId" = $3`,
      [newAmount, productId, userId]
    );

    res.sendStatus(200);
  } catch (e) {
    errorHandler(e, res);
  }
}
