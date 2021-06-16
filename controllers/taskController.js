const Task = require('../models/task');

exports.getTasks = async (req, res) => {
  try {
    if (!req.cookies.user) throw Error('User cookie undefined');
    const tasks = await Task.find({ user: req.cookies.user });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    if (!req.cookies.user) throw Error('User cookie undefined');
    const oneTask = await Task.findOne({ _id: req.params.id, user: req.cookies.user });
    res.json(oneTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postTask = async (req, res) => {
  try {
    if (!req.cookies.user) throw Error('User cookie undefined');
    const newTask = new Task({
      name: req.body.name,
      isCompleted: false,
      user: req.cookies.user,
    });
    await newTask.populate('user').execPopulate();
    const task = await newTask.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    if (!req.cookies.user) throw Error('User cookie undefined');
    const { id } = req.params;
    const taskById = await Task.findOneAndDelete(
      { _id: id, user: req.cookies.user },
    );
    res.json(taskById);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (!req.cookies.user) throw Error('User cookie undefined');
    const { id, ...data } = req.body;
    const updateTask = await Task.findOneAndUpdate(
      { _id: id, user: req.cookies.user }, data, { new: true, useFindAndModify: false },
    );
    res.json(updateTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
