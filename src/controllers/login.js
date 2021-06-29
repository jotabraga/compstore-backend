import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connectionDB } from "../config/database.js";
import { Login } from "../schemas/schemas.js";
import errorHandler from "./errorHandler.js";

export default async function login(req, res) {
  try {
    await Login.validateAsync(req.body);

    const { email, password } = req.body;
    const auth = await connectionDB.query(
      `SELECT hash, id, name FROM users 
      WHERE email = $1`,
      [email]
    );
    if (auth.rowCount === 0) return res.sendStatus(404);

    const { hash, id: userId, name } = auth.rows[0];
    if (email && bcrypt.compareSync(password, hash)) {
      let result = await connectionDB.query(
        `SELECT sessions.token, users.email 
        FROM sessions JOIN users ON sessions."userId" = users.id 
        WHERE users.email = $1`,
        [email]
      );

      if (result?.rowCount === 0) {
        const secret = process.env.JWT_SECRET;
        const configs = { expiresIn: 60 * 60 * 24 * 30 };
        const token = jwt.sign({ userId, name }, secret, configs);
        await connectionDB.query(
          `INSERT INTO sessions ("userId", token) 
          VALUES ($1,$2)`,
          [userId, token]
        );

        result = await connectionDB.query(
          `SELECT sessions.token, users.email 
          FROM sessions JOIN users ON sessions."userId" = users.id 
          WHERE users.email = $1`,
          [email]
        );
      }
      res
        .status(200)
        .send({ token: result.rows[0].token, name: auth.rows[0].name });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    errorHandler(e, res);
  }
}
