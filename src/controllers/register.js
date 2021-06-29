import bcrypt from "bcrypt";

import { connectionDB } from "../config/database.js";
import { Register } from "../schemas/schemas.js";
import errorHandler from "./errorHandler.js";

export default async function register(req, res) {
  try {
    await Register.validateAsync(req.body);

    const { name, email, cpf, password } = req.body;
    const result = await connectionDB.query(
      `SELECT * FROM users 
      WHERE email = $1 OR cpf = $2`,
      [email, cpf]
    );
    if (result.rowCount > 0) return res.sendStatus(409);

    const hash = bcrypt.hashSync(password, 12);
    await connectionDB.query(
      `INSERT INTO users (name,cpf,email,hash) 
      VALUES ($1,$2,$3,$4)`,
      [name, cpf, email, hash]
    );
    res.sendStatus(201);
  } catch (e) {
    errorHandler(e, res);
  }
}
