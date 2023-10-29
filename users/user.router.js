const express = require('express');
const middleware = require('./user.middleware')
const controller = require('./user.controller')
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser())

router.post('/signup', middleware.ValidateUserCreation, async(req,res) =>{
    const response = await controller.CreateUser({username: req.body.username, email: req.body.email, password: req.body.password, firstname: req.body.firstname, lastname: req.body.lastname})
    if (response.code === 200) {
        res.redirect('/login')
    } else{
        res.redirect('/existingUser')
    }
    })

router.post('/login', middleware.LoginValidation, async(req,res) => {
const response = await controller.Login({username: req.body.username, password: req.body.password})
if (response.code === 200) {
    res.cookie('jwt', response.data.token, {maxAge:60 * 60 * 3000})
    res.redirect('/tasks')
} else if (response.code === 404){
    res.redirect('/userNotFound')
} else {
    res.redirect('/invalidLoginInfo')
}
})


module.exports = router