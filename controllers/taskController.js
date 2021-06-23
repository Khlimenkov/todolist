const Task = require('../models/task');

exports.getTasks = async (req, res) => {
  try {
    if (!req.user) throw Error('User token undefined');
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    if (!req.user) throw Error('User token undefined');
    const oneTask = await Task.findOne({ _id: req.params.id, user: req.user });
    res.json(oneTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postTask = async (req, res) => {
  try {
    if (!req.user) throw Error('User token undefined');

    const newTask = new Task({
      name: req.body.name,
      isCompleted: false,
      user: req.user,
    });
    await newTask.populate('user').execPopulate();
    const task = await newTask.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    if (!req.user) throw Error('User token undefined');
    const { id } = req.params;
    const taskById = await Task.findOneAndDelete(
      { _id: id, user: req.user },
    );
    res.json({ taskById, delete: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (!req.user) throw Error('User token undefined');
    const { id, ...data } = req.body;
    const updateTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user }, data, { new: true, useFindAndModify: false },
    );
    res.json({ updateTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
