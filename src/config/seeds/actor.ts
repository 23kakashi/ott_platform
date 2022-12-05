import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("actor").del();

  // Inserts seed entries
  await knex("actor").insert([
    {
      name: "Marlee Sacker",
    },
    {
      name: "Charmion Wreford",
    },
    {
      name: "Sheela Clingoe",
    },
    {
      name: "Paulie Earsman",
    },
    {
      name: "Connie Porkiss",
    },
    {
      name: "Adriaens Klimkowski",
    },
    {
      name: "Monty Kingzet",
    },
    {
      name: "Hermon Hirschmann",
    },
    {
      name: "Krishna Castagneto",
    },
    {
      name: "Alis Hatherley",
    },
    {
      name: "Sonnnie L' Estrange",
    },
    {
      name: "Joelle Titlow",
    },
    {
      name: "Oneida Lujan",
    },
    {
      name: "Catharine DeSousa",
    },
    {
      name: "Ramsey Owthwaite",
    },
    {
      name: "Susi Melmar",
    },
    {
      name: "Selia Maha",
    },
    {
      name: "Romain Berge",
    },
    {
      name: "Diann Temprell",
    },
    {
      name: "Dale Cunio",
    },
    {
      name: "Banky Bearn",
    },
    {
      name: "Bryce Brewitt",
    },
    {
      name: "Sabine Deacock",
    },
    {
      name: "Morie Dessent",
    },
    {
      name: "Gratia Padillo",
    },
    {
      name: "Cherish Barkworth",
    },
    {
      name: "Meggi Windsor",
    },
    {
      name: "Angelle O'Scanlon",
    },
    {
      name: "Rowena Hanby",
    },
    {
      name: "Ebenezer Conniam",
    },
    {
      name: "Yovonnda Dainty",
    },
    {
      name: "Antoni Garham",
    },
    {
      name: "Amara Mockes",
    },
    {
      name: "Hermon Humbell",
    },
    {
      name: "Elonore Madre",
    },
    {
      name: "Cletis Klaves",
    },
    {
      name: "Durante Niblett",
    },
    {
      name: "Myrtice Tebboth",
    },
    {
      name: "Norrie Dollen",
    },
    {
      name: "Robin Tallow",
    },
    {
      name: "Gerrie Keunemann",
    },
    {
      name: "Alvira Titherington",
    },
    {
      name: "Hunfredo Silveston",
    },
    {
      name: "Michale Robbel",
    },
    {
      name: "Aldrich Kinchlea",
    },
    {
      name: "Kathryn Finicj",
    },
    {
      name: "Caryl Yeardley",
    },
    {
      name: "Aland Phuprate",
    },
    {
      name: "Ann-marie Toffaloni",
    },
    {
      name: "Farand Prickett",
    },
    {
      name: "Donnajean Christofle",
    },
    {
      name: "Caryl Daniel",
    },
    {
      name: "Marianna Gynni",
    },
    {
      name: "Dianne Piggot",
    },
    {
      name: "Dilly Nyssens",
    },
    {
      name: "Jecho Bembrick",
    },
    {
      name: "Jenelle Poulglais",
    },
    {
      name: "Junia Baugham",
    },
    {
      name: "Fanni Birley",
    },
    {
      name: "Aluin McAlester",
    },
    {
      name: "Link Cowl",
    },
    {
      name: "Karole Grannell",
    },
    {
      name: "Stace Kubec",
    },
    {
      name: "Dorette Giannini",
    },
    {
      name: "Alf Lampbrecht",
    },
    {
      name: "Gunar Barenskie",
    },
    {
      name: "Francklin Grundle",
    },
    {
      name: "Korey Viccary",
    },
    {
      name: "Cornelle Ogborn",
    },
    {
      name: "Mabel Claiden",
    },
    {
      name: "Calli Norgate",
    },
    {
      name: "Kordula Binnes",
    },
    {
      name: "Banky Willmont",
    },
    {
      name: "Coleman Lindenberg",
    },
    {
      name: "Olag Dudenie",
    },
    {
      name: "Gretta Monnelly",
    },
    {
      name: "Erie Mastrantone",
    },
    {
      name: "Carla Dailey",
    },
    {
      name: "Dewitt Geard",
    },
    {
      name: "Morissa Rockey",
    },
    {
      name: "Hillary Hilley",
    },
    {
      name: "Gian Sperrett",
    },
    {
      name: "Nollie Stapells",
    },
    {
      name: "Melinde Cansdale",
    },
    {
      name: "Addie McAuslene",
    },
    {
      name: "Field Lethley",
    },
    {
      name: "Lezley Lum",
    },
    {
      name: "Albrecht Ilyukhov",
    },
    {
      name: "Antonina Hirtz",
    },
    {
      name: "Forbes Greim",
    },
    {
      name: "Shaughn Roget",
    },
    {
      name: "Hagan Osban",
    },
    {
      name: "Cinda Cawsby",
    },
    {
      name: "Shirlee Filippazzo",
    },
    {
      name: "Rowen Garthside",
    },
    {
      name: "Dee dee Cridland",
    },
    {
      name: "Merrilee Alliberton",
    },
    {
      name: "Rudy Longhorne",
    },
    {
      name: "Caresa Di Meo",
    },
    {
      name: "Melanie Sharratt",
    },
  ]);
}
