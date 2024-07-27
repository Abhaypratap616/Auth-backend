const express = require('express');
const router = express.Router();

const {login,siginup} = require('../controller/auth');
const {auth,isstudent,isAdmin} = require('../middlewares/auth');

router.post('/login', login);
router.post('/signup', siginup);

//middleware
 router.get("/test", auth ,(req, res) => {
    res.json({
        message: "Test route"
    })
 });
 //for role 

 router.get("/student", auth, isstudent,(req, res,next) => {
res.json({
    succress: true,
    message: "Student route"
})
 });

 router.get("/admin", auth, isAdmin,(req, res,next) => {
    res.json({
        succress: true,
        message: "Admin route"
    })
  
 });

module.exports = router;
