import express, { Application, Request, Response } from "express";
import cors from "cors";
import knex from "./config/db";
require("dotenv").config();

const app: Application = express();

//setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", async (request, response) => {
  try {
    const data = await knex("userdb").select("*");
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

export default app;
