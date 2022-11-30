// import pg from "pg";
// const conString = process.env.CONNECTION_STRING;
// export const client = new pg.Client(conString);

//Connction with knex

import knex from "knex";
import obj from "../knexfile";

const env = process.env.NODE_ENV || "development";
const configOptions = obj.development;
export default knex(configOptions);
