const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "prices.json");

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }

  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function savePrice(url, price) {
  const data = loadData();

  if (!data[url]) {
    data[url] = [];
  }

  data[url].push({
    price,
    date: new Date().toISOString()
  });

  saveData(data);
}

function getHistory(url) {
  const data = loadData();
  return data[url] || [];
}

function getAllProducts() {
  const data = loadData();
  return Object.keys(data);
}

module.exports = {
  savePrice,
  getHistory,
  getAllProducts
};
