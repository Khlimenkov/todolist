const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.get('/', taskController.getTasks);
taskRouter.get('/:id', taskController.getTask);
taskRouter.post('/', taskController.postTask);
taskRouter.delete('/:id', taskController.deleteTask);
taskRouter.put('/', taskController.updateTask);

module.exports = taskRouter;
