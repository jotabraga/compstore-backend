import customExpress from "./config/customExpress";
import routes from "./routes/routes.js";

const app = customExpress();
routes(app);


export default app;