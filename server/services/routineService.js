const Routine = require("../models/Routine");

function getRoutines(query) {
  const filter = {};
  ["department", "semester", "section", "batch"].forEach((field) => {
    if (query[field]) filter[field] = query[field];
  });
  return Routine.find(filter).populate("faculty", "name designation email").sort({ day: 1, startTime: 1 });
}

const getRoutine = (id) => Routine.findById(id).populate("faculty", "name designation email");
const createRoutine = (data) => Routine.create(data);
const updateRoutine = (id, data) => Routine.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteRoutine = (id) => Routine.findByIdAndDelete(id);
module.exports = { getRoutines, getRoutine, createRoutine, updateRoutine, deleteRoutine };

