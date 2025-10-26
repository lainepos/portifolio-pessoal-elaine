const db = require('../db/memory');
const { v4: uuidv4 } = require('uuid');

exports.create = (data) => {
  const person = { id: uuidv4(), name: data.name, phone: data.phone, ministries: data.ministries || [], role: data.role || 'member' };
  db.people.push(person);
  // add person to ministries members list
  if (person.ministries && person.ministries.length) {
    for (const mid of person.ministries) {
      const m = db.ministries.find(x => x.id === mid);
      if (m) {
        m.members = m.members || [];
        if (!m.members.includes(person.id)) m.members.push(person.id);
      }
    }
  }
  return person;
};

exports.list = () => db.people;

