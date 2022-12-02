import express, { Application } from "express";
import cors from "cors";
require("dotenv").config();

import authRouter from "./routes/auth/login.routes";

const app: Application = express();

//setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);

export default app;
