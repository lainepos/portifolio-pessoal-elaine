const { db, save } = require('../db/memory');
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
  save();
  return event;
};

exports.list = () => {
  // return events with resolved person names for assignments
  return db.events.map(ev => {
    const resolvedAssignments = (ev.assignments || []).map(a => {
      const p = db.people.find(x => x.id === a.personId);
      return { personId: a.personId, personName: p ? p.name : null };
    });
    const ministry = db.ministries.find(m => m.id === ev.ministryId || m.name === ev.ministryId);
    const ministryName = ministry ? ministry.name : ev.ministryId;
    // Provide explicit ministryName while keeping ministryId unchanged.
    // Keep original id available in `ministryIdRaw` for clients that need it.
    return { ...ev, ministryIdRaw: ev.ministryId, ministryId: ev.ministryId, ministryName, assignments: resolvedAssignments };
  });
};
