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
          table.string("visStatus").defaultTo("default");
          table.string("homeTeam");
          table.integer("homePts").defaultTo(0);
          table.string("homeStatus").defaultTo("default");
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
          table.string("sc1A").defaultTo("default");
          table.string("sc1B").defaultTo("default");
          table.string("sc2A").defaultTo("default");
          table.string("sc2B").defaultTo("default");
          table.string("sc3A").defaultTo("default");
          table.string("sc3B").defaultTo("default");
          table.string("sc4A").defaultTo("default");
          table.string("sc4B").defaultTo("default");
          table.string("sc5A").defaultTo("default");
          table.string("sc5B").defaultTo("default");
          table.string("sc6A").defaultTo("default");
          table.string("sc6B").defaultTo("default");
          table.string("sc7A").defaultTo("default");
          table.string("sc7B").defaultTo("default");
          table.string("sc8A").defaultTo("default");
          table.string("sc8B").defaultTo("default");
          table.string("sc9A").defaultTo("default");
          table.string("sc9B").defaultTo("default");
          table.string("sc10A").defaultTo("default");
          table.string("sc10B").defaultTo("default");
          table.string("sc11A").defaultTo("default");
          table.string("sc11B").defaultTo("default");
          table.string("sc12A").defaultTo("default");
          table.string("sc12B").defaultTo("default");
          table.string("sc13A").defaultTo("default");
          table.string("sc13B").defaultTo("default");
          table.string("sc14A").defaultTo("default");
          table.string("sc14B").defaultTo("default");
          table.string("sc15A").defaultTo("default");
          table.string("sc15B").defaultTo("default");
          table.string("sc16A").defaultTo("default");
          table.string("sc16B").defaultTo("default");
          table.string("sc17A").defaultTo("default");
          table.string("sc17B").defaultTo("default");
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
