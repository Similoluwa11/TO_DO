const express = require('express');
const middleware = require('../middleware')
const taskController = require('../tasks/task.controller');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();
router.use('/', async (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedValue)
            res.locals.user = decodedValue
            
           
            next()
        } catch (error) {
            res.redirect('home')
        }
    } else {
        res.render('home')
    }
})
router.get('/', async (req,res) => {
    const response = await taskController.getTasks({user_id: res.locals.user._id});
    res.render('tasks', { 
        user: res.locals.user, 
        tasks: response.data.tasks
    });
})



router.post('/tasks_create', async (req, res) => {
    console.log({ body : req.body })
    const response = await taskController.createTask({name: req.body.name, description: req.body.description ,state: 'pending', user_id: res.locals.user._id});



    if (response.code === 200) {
        res.redirect('/tasks')
    } else {
        res.render('tasks_create', { error: response.message })
    }
})
router.post('/delete-task/:id', taskController.deleteTasks);
router.post('/update-state/:id', taskController.updateState);
  

module.exports = router; 