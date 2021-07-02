import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function products(req, res) {
  try {
    let result;
    if (req.query.category) {
      const categoryId = req.query.category;
      const category = await connectionDB.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
      if (category.rowCount === 0) return res.sendStatus(404);
      result = await connectionDB.query(`SELECT products.* FROM products JOIN categories ON categories.id = products."categoryId" WHERE categories.id = $1`, [categoryId]);
    } else
      result = await connectionDB.query(`SELECT * FROM products`);

    res.status(200).send(result.rows);
  } catch (e) {
    errorHandler(e, res);
  }
}
