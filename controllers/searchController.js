const { tavily } = require("@tavily/core");

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY
});

exports.search = async (req, res) => {
  try {
    const query = req.query.q || "latest AI news";

    const response = await tvly.search(query, {
      searchDepth: "advanced",
      maxResults: 5
    });

    res.json(response);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};