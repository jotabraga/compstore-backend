import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function getCart(req, res) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secret);
    if (!userId) return res.sendStatus(401);

    const client = await connectionDB.query(
      `SELECT * from users WHERE id = $1`,
      [userId]
    );

    const order = await connectionDB.query(
      `SELECT * FROM cart 
      WHERE "userId" = $1`,
      [userId]
    );

    order.rows.forEach((item) => {
      await connectionDB.query(
        `INSERT INTO orders (productId, userId)
            VALUES ($1, $2)`,
        [item.productId, item.userId]
      );
    });

    await connection.query(
      `
    DELETE FROM cart WHERE user_id = $1`,
      [userId]
    );

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: client.rows[0].email,
      from: "jpmbraga.feg@gmail.com", // Use the email address or domain you verified above
      subject: "ToysCamp - Confirmação de pedido",
      text: "Sua compra em ToysCamp foi confirmada com sucesso. \nObrigado pela preferência! \nVolte sempre!",
    };

    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
    return res.sendStatus(200);
  } catch (e) {
    errorHandler(e, res);
  }
}
