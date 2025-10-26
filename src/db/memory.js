const db = {
  users: [
    // seed: a leader user
    { id: 'leader1', username: 'leader1', password: 'password', ministries: ['min1'] },
  ],
  ministries: [
    { id: 'min1', name: 'Louvor', leaders: ['leader1'], members: [] },
  ],
  people: [],
  events: [],
};

module.exports = db;
