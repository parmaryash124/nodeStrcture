import express from "express";
import { APP_PORT, DB_URL } from "./config";
import routes from "./routes";
import mongoose from "mongoose";

import errorHandler from "./middlewares/errorHandler";
const app = express();

// Database connection
mongoose.connect(DB_URL);
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});

const PORT = APP_PORT || 4000;

app.use(express.json());

app.use("/api", routes);

// app.use(expressValidator);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
