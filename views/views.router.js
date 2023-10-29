const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const router = express.Router();

router.use(cookieParser())

router.get('/', (req, res) => {
    res.render('home');
})


router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/login', (req, res) => {
    res.render('login', { user: res.locals.user || null });
})

router.get('/logout', (req, res) => {    
    res.clearCookie('jwt')
    res.render('home')
});
router.get('/tasks_create', (req, res) => {
    res.render('tasks_create', 
    { user: res.locals.user });
})

router.get('/existingUser', (req, res) => {
    res.render('existingUser');
})
router.get('/invalidLoginInfo', (req, res) => {
    res.render('invalidLoginInfo');
})
router.get('/userNotFound', (req, res) => {
    res.render('userNotFound');
})

  

module.exports = router;    