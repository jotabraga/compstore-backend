import dotenv from "dotenv";

import app from "./app";

const dev = process.env?.NODE_ENV === "development" ? " on Dev mode" : "";

dotenv.config({ path: __dirname + "/./../.env" });
const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server runing on port ${PORT + dev}`);
});