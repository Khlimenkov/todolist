const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.get('/:id', taskController.getTask);
taskRouter.get('/', taskController.getTasks);
taskRouter.post('/', taskController.postTask);
taskRouter.delete('/:id', taskController.deleteTask);
taskRouter.put('/', taskController.updateTask);

module.exports = taskRouter;
