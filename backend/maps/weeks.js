const {
  STATUS_TO_POINTS_REGULAR,
  STATUS_TO_POINTS_WILDCARD,
  STATUS_TO_POINTS_SEMI,
  STATUS_TO_POINTS_QUARTER,
  STATUS_TO_POINTS_SUPERBOWL,
} = require("./scoreMap");

exports.WEEKS = [
  { wk: "wk1A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk1B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk2A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk2B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk3A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk3B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk4A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk4B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk5A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk5B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk6A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk6B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk7A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk7B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk8A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk8B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk9A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk9B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk10A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk10B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk11A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk11B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk12A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk12B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk13A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk13B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk14A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk14B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk15A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk15B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk16A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk16B", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk17A", scorer: STATUS_TO_POINTS_REGULAR },
  { wk: "wk17B", scorer: STATUS_TO_POINTS_REGULAR },
];

exports.WEEKSPLAYOFF = [
  { wk: "wk18A", scorer: STATUS_TO_POINTS_WILDCARD },
  { wk: "wk18B", scorer: STATUS_TO_POINTS_WILDCARD },
  { wk: "wk18C", scorer: STATUS_TO_POINTS_WILDCARD },
  { wk: "wk18D", scorer: STATUS_TO_POINTS_WILDCARD },
  { wk: "wk18E", scorer: STATUS_TO_POINTS_WILDCARD },
  { wk: "wk18F", scorer: STATUS_TO_POINTS_WILDCARD },
  { wk: "wk19A", scorer: STATUS_TO_POINTS_SEMI },
  { wk: "wk19B", scorer: STATUS_TO_POINTS_SEMI },
  { wk: "wk19C", scorer: STATUS_TO_POINTS_SEMI },
  { wk: "wk19D", scorer: STATUS_TO_POINTS_SEMI },
  { wk: "wk20A", scorer: STATUS_TO_POINTS_QUARTER },
  { wk: "wk20B", scorer: STATUS_TO_POINTS_QUARTER },
  { wk: "wk21A", scorer: STATUS_TO_POINTS_SUPERBOWL },
];
