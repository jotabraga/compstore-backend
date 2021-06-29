import express from "express";

import register from "../controllers/register.js";

const routes = express.Router();

routes.post("/register", (req, res) => register(req, res));

routes.use((_, res) => res.send("404: Page not found"));

export default routes;