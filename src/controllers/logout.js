import jwt from "jsonwebtoken";

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function logout(req, res) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secret);
    if (!userId) return res.sendStatus(401);
    
    await connectionDB.query(
      `DELETE FROM sessions
        WHERE "userId" = $1`,
      [userId]
    );
    res.sendStatus(200);
  } catch (e) {
    errorHandler(e, res);
  }
}
