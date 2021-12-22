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
          table.string("id").primary().notNullable(); // `${week}_${visTeam}_${homeTeam}`
          table.string("startTime").notNullable();
          table.integer("week").notNullable();
          table.string("visTeam").notNullable();
          table.string("homeTeam").notNullable();
          table.string("pickWindowDay");
          table.integer("pickWindowHour");
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
          table.string("id").primary().notNullable();
          table.string("mascotName").notNullable();
          table.string("fullName").notNullable();
          table.integer("numOfWin").defaultTo(0);
          table.integer("numOfLoss").defaultTo(0);
          table.integer("numOfTie").defaultTo(0);
          table.string("wk1").defaultTo("default");
          table.string("wk2").defaultTo("default");
          table.string("wk3").defaultTo("default");
          table.string("wk4").defaultTo("default");
          table.string("wk5").defaultTo("default");
          table.string("wk6").defaultTo("default");
          table.string("wk7").defaultTo("default");
          table.string("wk8").defaultTo("default");
          table.string("wk9").defaultTo("default");
          table.string("wk10").defaultTo("default");
          table.string("wk11").defaultTo("default");
          table.string("wk12").defaultTo("default");
          table.string("wk13").defaultTo("default");
          table.string("wk14").defaultTo("default");
          table.string("wk15").defaultTo("default");
          table.string("wk16").defaultTo("default");
          table.string("wk17").defaultTo("default");
          table.string("wk18").defaultTo("default");
          table.string("wk19").defaultTo("default");
          table.string("wk20").defaultTo("default");
          table.string("wk21").defaultTo("default");
          table.string("wk22").defaultTo("default");      
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
          table.string("id").primary().notNullable();
          table.string("firstName").notNullable();
          table.string("lastName").notNullable();
          table.integer("numOfWin").defaultTo(0);
          table.integer("numOfLoss").defaultTo(0);
          table.integer("numOfTie").defaultTo(0);
          table.integer("score").defaultTo(0);
          table.integer("numOfWinPlayoff").defaultTo(0);
          table.integer("numOfLossPlayoff").defaultTo(0);
          table.integer("numOfTiePlayoff").defaultTo(0);
          table.integer("scorePlayoff").defaultTo(0);
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
          table.string("wk18A");
          table.string("wk18B");
          table.string("wk19A"); // start post-season games
          table.string("wk19B");
          table.string("wk19C");
          table.string("wk19D");
          table.string("wk19E");
          table.string("wk19F");
          table.string("wk20A");
          table.string("wk20B");
          table.string("wk20C");
          table.string("wk20D");
          table.string("wk21A");
          table.string("wk21B");
          table.string("wk22A");
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

module.exports = knex;
