import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function deleteCart(req, res) {
  try {

    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const {userId} = jwt.verify(token, secret)
    if (!userId) return res.sendStatus(409);

    const { productId } = req.body;

    const result = await connectionDB.query(
      `DELETE FROM cart 
      WHERE "productId" = $1 AND "userId" = $2`,
      [productId, userId]
    );

    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}
