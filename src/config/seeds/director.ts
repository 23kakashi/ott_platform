import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("director").del();

  // Inserts seed entries
  await knex("director").insert([
    {
      director_name: "Marlee Sacker",
    },
    {
      director_name: "Charmion Wreford",
    },
    {
      director_name: "Sheela Clingoe",
    },
    {
      director_name: "Paulie Earsman",
    },
    {
      director_name: "Connie Porkiss",
    },
    {
      director_name: "Adriaens Klimkowski",
    },
    {
      director_name: "Monty Kingzet",
    },
    {
      director_name: "Hermon Hirschmann",
    },
    {
      director_name: "Krishna Castagneto",
    },
    {
      director_name: "Alis Hatherley",
    },
    {
      director_name: "Sonnnie L' Estrange",
    },
    {
      director_name: "Joelle Titlow",
    },
    {
      director_name: "Oneida Lujan",
    },
    {
      director_name: "Catharine DeSousa",
    },
    {
      director_name: "Ramsey Owthwaite",
    },
    {
      director_name: "Susi Melmar",
    },
    {
      director_name: "Selia Maha",
    },
    {
      director_name: "Romain Berge",
    },
    {
      director_name: "Diann Temprell",
    },
    {
      director_name: "Dale Cunio",
    },
  ]);
}
