const { db, save } = require('../db/memory');
const { v4: uuidv4 } = require('uuid');

exports.create = (data) => {
  const ministry = { id: uuidv4(), name: data.name, leaders: data.leaders || [], members: data.members || [] };
  db.ministries.push(ministry);
  // wire leaders and members to people
  if (ministry.leaders && ministry.leaders.length) {
    for (const leaderId of ministry.leaders) {
      const p = db.people.find(x => x.id === leaderId);
      if (p) {
        p.role = p.role || 'leader';
        p.ministries = p.ministries || [];
        if (!p.ministries.includes(ministry.id)) p.ministries.push(ministry.id);
      }
    }
  }
  if (ministry.members && ministry.members.length) {
    for (const memberId of ministry.members) {
      const p = db.people.find(x => x.id === memberId);
      if (p) {
        p.ministries = p.ministries || [];
        if (!p.ministries.includes(ministry.id)) p.ministries.push(ministry.id);
      }
    }
  }
  save();
  return ministry;
};

exports.list = () => db.ministries;

