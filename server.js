const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = 'data.json';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');

app.post('/log', (req, res) => {
  const { answer } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const log = {
    answer,
    ip,
    timestamp: new Date().toISOString()
  };

  const data = JSON.parse(fs.readFileSync(DB_FILE));
  data.push(log);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.json({ status: 'ok' });
});

app.get('/logs', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
