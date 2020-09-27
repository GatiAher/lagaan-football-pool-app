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
          table.string("id").primary(); // `${season}_${week}_${visTeam}_${homeTeam}`
          table.integer("startTime");
          table.integer("week");
          table.integer("season");
          table.string("visTeam");
          table.integer("visPts").defaultTo(0);
          table.integer("visStatus").defaultTo(-1);
          table.string("homeTeam");
          table.integer("homePts").defaultTo(0);
          table.integer("homeStatus").defaultTo(-1);
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Table 'Game' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("Team")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("Team", (table) => {
          table.string("id").primary(); // `${season}_${week}_${visTeam}_${homeTeam}`
          table.integer("season");
          table.integer("numOfWin").defaultTo(0);
          table.integer("numOfLoss").defaultTo(0);
          table.integer("numOfTie").defaultTo(0);
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Table 'Game' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("User")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("User", (table) => {
          table.string("username").notNullable();
          table.integer("id").primary();
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
          table.integer("sc1A");
          table.integer("sc1B");
          table.integer("sc2A");
          table.integer("sc2B");
          table.integer("sc3A");
          table.integer("sc3B");
          table.integer("sc4A");
          table.integer("sc4B");
          table.integer("sc5A");
          table.integer("sc5B");
          table.integer("sc6A");
          table.integer("sc6B");
          table.integer("sc7A");
          table.integer("sc7B");
          table.integer("sc8A");
          table.integer("sc8B");
          table.integer("sc9A");
          table.integer("sc9B");
          table.integer("sc10A");
          table.integer("sc10B");
          table.integer("sc11A");
          table.integer("sc11B");
          table.integer("sc12A");
          table.integer("sc12B");
          table.integer("sc13A");
          table.integer("sc13B");
          table.integer("sc14A");
          table.integer("sc14B");
          table.integer("sc15A");
          table.integer("sc15B");
          table.integer("sc16A");
          table.integer("sc16B");
          table.integer("sc17A");
          table.integer("sc17B");
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Table 'User' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in table
knex
  .select("*")
  .from("Game")
  // .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));
// Export the database
module.exports = knex;
