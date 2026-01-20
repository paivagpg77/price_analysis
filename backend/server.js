const express = require("express");
const cors = require("cors");
const { getPrice } = require("./scraper");
const { savePrice } = require("./storage");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/track", async (req, res) => {
  const { url } = req.body;

  try {
    const price = await getPrice(url);
    savePrice(url, price);

    res.json({ success: true, price });
  } catch (err) {
    console.error("❌ ERRO NO SCRAPER:", err.message);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend rodando em http://localhost:3000");
});
