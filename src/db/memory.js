const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', '..', 'data');
const filePath = path.join(dataDir, 'db.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultDb = {
  users: [
    { id: 'leader1', username: 'leader1', password: 'password', ministries: ['min1'] }
  ],
  ministries: [
    { id: 'min1', name: 'Louvor', leaders: ['leader1'], members: [] }
  ],
  people: [],
  events: []
};

let db = defaultDb;

try {
  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf8');
    db = JSON.parse(text);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
  }
} catch (err) {
  console.error('Error loading db.json, falling back to default in-memory DB', err);
  db = defaultDb;
}

function save() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving db.json', err);
  }
}

// autosave every 3s to reduce chance of lost updates
const AUTO_SAVE_MS = 3000;
const timer = setInterval(save, AUTO_SAVE_MS);

function shutdownSave() {
  try {
    save();
  } finally {
    clearInterval(timer);
  }
}

process.on('SIGINT', shutdownSave);
process.on('SIGTERM', shutdownSave);

module.exports = { db, save };
