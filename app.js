const express = require('express');
const userRouter = require('./users/user.router')
const viewRouter = require('./views/views.router')
const taskRouter = require('./tasks/tasks.router.js')
const UserModel = require('./models/user.model');
require('dotenv').config();
const PORT = process.env.PORT
const db = require('./db');

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })); 
db.connect();

app.set('view engine', 'ejs')
app.set("views", "views");
app.use('/', viewRouter)
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'success', status: true })
})
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.get('/users', async (req, res) => {
    const users = await UserModel.find({})
    return res.json({
        users
    })
})

app.get('*', (req, res) => {
    return res.status(404).render('pageNotFound')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
module.exports = app;