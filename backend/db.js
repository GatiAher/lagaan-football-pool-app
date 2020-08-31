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
          table.increments("id").primary();
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

// Just for debugging purposes:
// Log all data in table
knex
  .select("*")
  .from("Game")
  // .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));
// Export the database
module.exports = knex;
