import express from "express";
import env from "dotenv";
import cors from "cors";
import DB_Init from "./Entities/DbInit.js";
import createDbRouter from "./Routes/CreateDbRoute.js";
import userRouter from "./Routes/UserRouter.js";

env.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

DB_Init();

app.use("/api", createDbRouter);
app.use("/api", userRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log("API is runnning at " + port);
