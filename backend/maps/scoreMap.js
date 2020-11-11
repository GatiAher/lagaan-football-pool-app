exports.STATUS_TO_POINTS_REGULAR = new Map([
  ["win", 2],
  ["tie", 1],
  ["loss", -1],
  ["default", 0],
]);

exports.STATUS_TO_POINTS_WILDCARD = new Map([
  ["win", 2],
  ["tie", 0],
  ["loss", -2],
  ["default", 0],
]);

exports.STATUS_TO_POINTS_SEMI = new Map([
  ["win", 4],
  ["tie", 0],
  ["loss", -4],
  ["default", 0],
]);

exports.STATUS_TO_POINTS_QUARTER = new Map([
  ["win", 6],
  ["tie", 0],
  ["loss", -6],
  ["default", 0],
]);

exports.STATUS_TO_POINTS_SUPERBOWL = new Map([
  ["win", 8],
  ["tie", 0],
  ["loss", -8],
  ["default", 0],
]);
