import customExpress from "./config/customExpress.js";
import routes from "./routes/routes.js";

const app = customExpress();
app.use("/api", routes);

export default app;