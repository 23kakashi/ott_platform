import express, { Application } from "express";
import cors from "cors";
import session from "express-session";
require("dotenv").config();
import cookieParser from "cookie-parser";
import AuthControllerObj from "./controller/Auth/AuthController";
import AdminControllerObj from "./controller/Admin/AdminController";
import UserControllerObj from "./controller/User/UserController";

export class App {
  public connection: Application;
  // public logger: Logger
  constructor() {
    this.connection = express();
    this.init();
  }

  private middleware(): void {
    this.connection.set("trust proxy", 1);
    this.connection.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    this.connection.use(
      session({
        secret: "eiuof978weruyiuwef79438rferi23",
        resave: false,
        saveUninitialized: true,
      })
    );

    this.connection.use(cookieParser());
    this.connection.use(express.urlencoded({ extended: true }));
    this.connection.use(express.json());
  }

  private routes(): void {
    this.connection.use("/auth", AuthControllerObj.authRouter);
    this.connection.use("/admin", AdminControllerObj.adminRouter);
    this.connection.use("/user", UserControllerObj.userRouter);
  }

  private init() {
    this.middleware();
    this.routes();
  }
}

//setup
