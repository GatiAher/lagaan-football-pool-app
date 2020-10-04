// Import path module
const path = require("path");
// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite");
// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable("Game")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("Game", (table) => {
          table.string("id").primary(); // `${week}_${visTeam}_${homeTeam}`
          table.integer("startTime");
          table.integer("week");
          table.string("visTeam");
          table.string("homeTeam");
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Game: table created");
        })
        .catch((error) => {
          console.error(`Game: there was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("Game: exists");
  })
  .catch((error) => {
    console.error(`Game: there was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("Team")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("Team", (table) => {
          table.string("id").primary();
          table.string("mascotName");
          table.string("fullName");
          table.integer("numOfWin").defaultTo(0);
          table.integer("numOfLoss").defaultTo(0);
          table.integer("numOfTie").defaultTo(0);
          table.string("wk1");
          table.string("wk2");
          table.string("wk3");
          table.string("wk4");
          table.string("wk5");
          table.string("wk6");
          table.string("wk7");
          table.string("wk8");
          table.string("wk9");
          table.string("wk10");
          table.string("wk11");
          table.string("wk12");
          table.string("wk13");
          table.string("wk14");
          table.string("wk15");
          table.string("wk16");
          table.string("wk17");
          table.timestamps(true, true);
        })
        .then(() => {
          console.log("Team: table created");
        })
        .catch((error) => {
          console.error(`Team: there was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("Team: exists");
  })
  .catch((error) => {
    console.error(`Team: there was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("User")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("User", (table) => {
          table.string("username").notNullable();
          table.string("id").primary();
          table.string("firstName");
          table.string("lastName");
          table.integer("rank");
          table.integer("score").defaultTo(0);
          table.string("wk1A");
          table.string("wk1B");
          table.string("wk2A");
          table.string("wk2B");
          table.string("wk3A");
          table.string("wk3B");
          table.string("wk4A");
          table.string("wk4B");
          table.string("wk5A");
          table.string("wk5B");
          table.string("wk6A");
          table.string("wk6B");
          table.string("wk7A");
          table.string("wk7B");
          table.string("wk8A");
          table.string("wk8B");
          table.string("wk9A");
          table.string("wk9B");
          table.string("wk10A");
          table.string("wk10B");
          table.string("wk11A");
          table.string("wk11B");
          table.string("wk12A");
          table.string("wk12B");
          table.string("wk13A");
          table.string("wk13B");
          table.string("wk14A");
          table.string("wk14B");
          table.string("wk15A");
          table.string("wk15B");
          table.string("wk16A");
          table.string("wk16B");
          table.string("wk17A");
          table.string("wk17B");
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("User: table created");
        })
        .catch((error) => {
          console.error(`User: there was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("User: exists");
  })
  .catch((error) => {
    console.error(`User: there was an error setting up the database: ${error}`);
  });

// // Just for debugging purposes:
// // Log all data in table
// knex
//   .select("*")
//   .from("Game")
//   .then((data) => console.log("data:", data))
//   .catch((err) => console.log(err));

// Export the database
module.exports = knex;
