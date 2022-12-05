import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("geners").del();

  // Inserts seed entries
  await knex("geners").insert([
    { geners: "Action" },
    { geners: "Adventure" },
    { geners: "Animated" },
    { geners: "Biography" },
    { geners: "Comedy" },
    { geners: "Crime" },
    { geners: "Dance" },
    { geners: "Disaster" },
    { geners: "Documentary" },
    { geners: "Drama" },
    { geners: "Erotic" },
    { geners: "Family" },
    { geners: "Fantasy" },
    { geners: "Found Footage" },
    { geners: "Historical" },
    { geners: "Horror" },
    { geners: "Independent" },
    { geners: "Legal" },
    { geners: "Live Action" },
    { geners: "Martial Arts" },
    { geners: "Musical" },
    { geners: "Mystery" },
    { geners: "Noir" },
    { geners: "Performance" },
    { geners: "Political" },
    { geners: "Romance" },
    { geners: "Satire" },
    { geners: "Science Fiction" },
    { geners: "Short" },
    { geners: "Silent" },
    { geners: "Slasher" },
    { geners: "Sports" },
    { geners: "Spy" },
    { geners: "Superhero" },
    { geners: "Supernatural" },
    { geners: "Suspense" },
    { geners: "Teen" },
    { geners: "Thriller" },
    { geners: "War" },
    { geners: "Western" },
  ]);
}
