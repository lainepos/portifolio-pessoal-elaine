const db = require('../db/memory');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

function sameDay(a, b) {
  return dayjs(a).isSame(dayjs(b), 'day');
}

exports.create = (data) => {
  // data: { title, date, ministryId, assignments: [{ personId }...] }
  const date = data.date;
  // validate assignments
  for (const assign of (data.assignments || [])) {
    const personId = assign.personId;
    // check existing events for the same day
    const conflict = db.events.find(ev => sameDay(ev.date, date) && ev.assignments.some(a => a.personId === personId));
    if (conflict) throw new Error(`Person ${personId} already assigned on ${date}`);
  }

  const event = { id: uuidv4(), title: data.title, date, ministryId: data.ministryId, assignments: data.assignments || [] };
  db.events.push(event);
  return event;
};

exports.list = () => db.events;
