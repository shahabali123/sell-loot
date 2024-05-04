const express = require('express');
const router = express.Router();
const {Seller} = require("../models/schema.js");
const wrapAsync = require('../utils/wrapAsync.js');
// schema validation middlewares require
const { validateSeller} = require('../utils/middlewares.js');
const ExpressError = require('../utils/ExpressError.js');



router.get('/seller-signup', (req,res)=>{
    res.render('./users/seller-signup')
})

router.get('/seller-login', (req, res)=>{
    res.render('./users/seller-login');
});


// signup seller post route
router.post('/seller-signup', validateSeller, wrapAsync(async(req, res)=>{
    const {name, email, password} = req.body;
    const newSeller = await Seller.create({
        name: name,
        email: email,
        password: password
    })
    newSeller.save().then(console.log(newSeller));
    res.redirect('/');
}));



// login seller post route
router.post('/seller-login', wrapAsync( async(req,res)=>{
    const {email, password} = req.body;
    // check if the user is a seller or not  
    let seller = await Seller.findOne({email: email, password: password});
    
    if(seller){
        res.redirect('/seller-portal');
    }else{
        res.send('Invalid  credentials! Please try again with correct details.');
    }
}));

module.exports = router;