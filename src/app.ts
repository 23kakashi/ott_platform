import express, { Application } from "express";
import cors from "cors";
import session from "express-session";
require("dotenv").config();
import cookieParser from "cookie-parser";
import authController from "./controller/auth/loginController";
import adminController from "./controller/Admin/adminController";

const app: Application = express();

//setup
app.set("trust proxy", 1);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    secret: "eiuof978weruyiuwef79438rferi23",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authController);
app.use("/admin", adminController);

export default app;
