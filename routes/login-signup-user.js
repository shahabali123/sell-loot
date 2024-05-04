const express = require('express');
const router  = express.Router();
const {User} = require("../models/schema.js");
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');




// login signup users
router.get('/user-login', (req,res)=>{
    res.render("./users/user-login")
})

router.get('/user-signup', (req, res)=>{
    res.render("./users/user-signup")
});



// signup user post route
router.post('/user-signup', wrapAsync( async(req, res)=>{
    const {name, email, password} = req.body;
    const newUser = await User.create({
        name: name,
        email: email,
        password: password
    })
    newUser.save().then(console.log(newUser));
    res.redirect('/');
}));


// login user post route
router.post('/user-login', wrapAsync( async(req,res, next)=>{
    const {email, password} = req.body;
    // check if the user is a seller or not  
    let user = await User.findOne({email: email, password: password});
    
    if(user){
        res.redirect('/')
    }else{
        throw new ExpressError(404, "Invalid credentials, please put correct  username and password");
        
    }
}));

module.exports = router;