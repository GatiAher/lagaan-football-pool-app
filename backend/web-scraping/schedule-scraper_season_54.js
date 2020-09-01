const request = require("request-promise");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

const { TEAM_LONG_TO_ABBR } = require("../constants/teams");

const MONTHS = new Map([
  ["January", 0],
  ["February", 1],
  ["March", 2],
  ["April", 3],
  ["May", 4],
  ["June", 5],
  ["July", 6],
  ["August", 7],
  ["September", 8],
  ["October", 9],
  ["November", 10],
  ["December", 11],
]);

/* 
returns number of milliseconds since Jan 1, 1979 00:00:00 UTC
date: LongName Int
time: HH:MM XX

NOTE: assume year 2020 or 2021 for January
NOTE: assume server timezone eastern (GMT-400) for Date
*/
const getDateValue = (date, time) => {
  // set date
  const [monthName, monthDayString] = date.split(" ");
  const monthValue = MONTHS.get(monthName);
  const dateValue = parseInt(monthDayString, 10);
  const year = monthValue === 0 ? 2021 : 2020;

  // set time
  let hours = Number(time.match(/^(\d+)/)[1]);
  const minutes = Number(time.match(/:(\d+)/)[1]);
  const AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;

  const dateObj = new Date(year, monthValue, dateValue, hours, minutes);
  return dateObj.valueOf();
};

const getGamesListFromTable = (table) => {
  const games = [];
  table[0].forEach((weekNum, idx) => {
    if (weekNum !== "Week") {
      const date = table[2][idx].match(/>(.*)</).pop();
      const time = table[8][idx];
      const startTime = getDateValue(date, time);
      const week = weekNum;
      // NOTE: season 54, (year 2020)
      const season = 54;
      const visTeam = TEAM_LONG_TO_ABBR.get(
        table[3][idx].match(/>(.*)</).pop()
      );
      const homeTeam = TEAM_LONG_TO_ABBR.get(
        table[6][idx].match(/>(.*)</).pop()
      );
      games.push({ startTime, week, season, visTeam, homeTeam });
    }
  });
  return games;
};

const scrapeGamesTable = async () => {
  const result = await request.get(
    "https://www.pro-football-reference.com/years/2020/games.htm"
  );
  const $ = cheerio.load(result);
  cheerioTableparser($);
  const resultTable = $(
    "body > #wrap > #content > #all_games > div > #div_games"
  );
  const parsedTable = resultTable.parsetable();
  return parsedTable;
};

exports.getGames = async () => {
  const parsedTable = await scrapeGamesTable();
  return getGamesListFromTable(parsedTable);
};
