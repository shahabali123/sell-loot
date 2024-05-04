const express = require('express');
const router  = express.Router();
const {Listing} = require("../models/schema.js");
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');





// index route
router.get('/', wrapAsync(async(req, res) =>{
    let allListings = await Listing.find({});
    res.render('index', {allListings});
}));


// product show page
router.get('/product-show/:id', wrapAsync(async(req,res)=>{
    const id= req.params.id; 
    let listing = await Listing.findById(id).populate('rating');
    res.render('./product/product-show', {listing});
}));


module.exports = router;

