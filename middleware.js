const jwt = require('jsonwebtoken');
require('dotenv').config();
const ensureAuth = async (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedValue)
            re
            
           
            next()
        } catch (error) {
            res.redirect('home')
        }
    } else {
        res.render('home')
    }
}
module.exports = {ensureAuth}