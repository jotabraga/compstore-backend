import express from "express";

import register from "../controllers/register.js";
import login from "../controllers/login.js";
import products from "../controllers/products.js";
import categories from "../controllers/categories.js";
import getCart from "../controllers/getCart.js";
import createCart from "../controllers/createCart.js";
import editCart from "../controllers/editCart.js";
import deleteCart from "../controllers/deleteCart.js";

const routes = express.Router();

routes.post("/register", (req, res) => register(req, res));

routes.post("/login", (req, res) => login(req, res));

routes.get("/products", (req, res) => products(req, res));

routes.get("/categories", (_, res) => categories(_, res));

routes.post("/cart", (req, res) => createCart(req, res));

routes.get("/cart", (req, res) => getCart(req, res));

routes.post("/edit-cart", (req, res) => editCart(req, res));

routes.delete("/cart/:id", (req, res) => deleteCart(req, res));

routes.use((_, res) => res.send("404: Page not found"));

export default routes;
