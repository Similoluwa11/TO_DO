const TaskModel = require('../models/task.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getTasks = async ({user_id}) => {
    const tasks = await TaskModel.find({user_id});

    return {
        code: 200,
        success: true,
        message: 'Tasks fetched successfully',
        data: {
            tasks
        }
    }
}

const createTask = async ({name, description, state, user_id}) => {
 
    const taskFromRequest = {name, description, state, user_id};
    if(!taskFromRequest){
        return {
        code: 422,
        message: 'Invalid info. Please provide name of task'
        }
    }

    
    const savedTask = await TaskModel.create(taskFromRequest)

    return {
        code: 200,
        success: true,
        message: 'Task created successfully',
        data: {
            task: savedTask
        }
    }
}   
const deleteTasks = async (req, res) => {
    const taskId = req.params.taskId;
  
    try {
    
      await TaskModel.findByIdAndRemove(taskId);
      res.redirect('/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).render('/tasks');
    }
  }
  const updateState = async (req,res) => {
    const taskId = req.params.taskId;

    const update =  req.body
    try {
    
      await TaskModel.findByIdAndUpdate(taskId, update, {new: true});
      res.redirect('/tasks');
    } catch (error) {
      console.error('Error updating state.', error);
      res.status(500).render('/tasks');
    }
  }
module.exports = {
    getTasks,
    createTask,
    deleteTasks,
    updateState
}