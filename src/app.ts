import express, { Application, Request, Response } from "express";
import cors from "cors";
import { sendOtp } from "./utils/otp";
require("dotenv").config();

import authRouter from "./routes/auth/login.routes";

const app: Application = express();

//setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);

export default app;
