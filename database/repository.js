const fs = require("fs");

const path = "../database/db.json";
let toDoLists = [];

// Read
exports.findAll = function () {
  toDoLists = readJSON();
  return toDoLists;
};

// Create
exports.add = function (model) {
  try {
    toDoLists.push(model);
    writeJSON(toDoLists);
    console.log("Create Success");
    return toDoLists;
  }
  catch (err) {
    return err;
  }
};

// Update
exports.update = function (model) {
  try {
    index = toDoLists.findIndex((
      item => item.task_id === model.task_id));
    toDoLists[index] = model;
    writeJSON(toDoLists);
    console.log("Update Success");
    return toDoLists;
  }
  catch (err) {
    return err;
  }
};

// Delete
exports.remove = function (model) {
  try {
    toDoLists = toDoLists.filter((item) => {
      if (item.task_id !== model.task_id) {
        return item;
      }
    });
    writeJSON(toDoLists);
    console.log("Delete Success");
    return toDoLists;
  }
  catch (err) {
    return err;
  }
};

// sort by date greater 
exports.sortByDueDateGreater = function () {
  toDoLists.sort((task1, task2) =>
    new Date(task2.dueDate) - new Date(task1.dueDate)
  );
  return toDoLists;
};

// sort by date less 
exports.sortByDueDateLess = function () {
  sorted = toDoLists.sort((task1, task2) =>
    new Date(task1.dueDate) - new Date(task2.dueDate)
  );
  return sorted;
};

// completed only 
exports.completed = function () {
  filtered = toDoLists.filter( item => 
    item.status === "completed");
  return filtered;
};

// uncompleted only
exports.uncompleted = function () {
  filtered = toDoLists.filter( item => 
    item.status === "uncompleted");
  return filtered;
};

// import JSON
const writeJSON = (data) => {
  const stringifyData = JSON.stringify(data);
  try {
    fs.writeFileSync(path, stringifyData);
    console.log("JSON data export success.");
  } catch (error) {
    console.error(err);
  }
};

// export JSON
const readJSON = () => {
  try {
    const jsonData = fs.readFileSync(path);
    console.log("JSON data import success.");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(err);
  }
};