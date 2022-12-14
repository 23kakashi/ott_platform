import express, { Application } from "express";
import cors from "cors";
import session from "express-session";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import cookieParser from "cookie-parser";
import AuthControllerObj from "./controller/Auth/AuthController";
import AdminControllerObj from "./controller/Admin/AdminController";
import UserControllerObj from "./controller/User/UserController";
import swaggerUi from "swagger-ui-express";
import swagger from "./Docs/swagger.json";

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
      session({
        secret: "eiuof978weruyiuwef79438rferi23",
        resave: false,
        saveUninitialized: true,
      })
    );
    this.connection.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
    this.connection.use(cookieParser());
    this.connection.use(express.urlencoded({ extended: true }));
    this.connection.use(express.json());
    this.connection.use(cors());
  }

  private routes(): void {
    this.connection.use("/auth", AuthControllerObj.authRouter);
    this.connection.use("/user", UserControllerObj.userRouter);
    this.connection.use("/admin", AdminControllerObj.adminRouter);
  }

  private init() {
    this.middleware();
    this.routes();
  }
}

//setup
