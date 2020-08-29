const axios = require("axios");

const getForum = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.reddit.com/r/programming.json"
    );
    res.json({ message: `got data` });
    console.log(response);
  } catch (error) {
    console.error(error);
    res.json({ message: `There was an error: ${error}` });
  }
};

module.exports = getForum;
