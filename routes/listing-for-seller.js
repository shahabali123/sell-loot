const express = require('express');
const router = express.Router();
const {Listing} = require("../models/schema.js");
const wrapAsync = require('../utils/wrapAsync.js');
// schema validation middlewares require
const {validateListing} = require('../utils/middlewares.js');
const ExpressError = require('../utils/ExpressError.js');





// seller related
router.get('/seller-portal', wrapAsync(async(req, res)=>{
    let allListings = await Listing.find({}).populate('seller');
    res.render("./users/seller-portal", {allListings});
}));

// edit listing get route for seller
router.get('/product-edit/:id', wrapAsync( async(req, res)=>{
    let id = req.params.id;
    let listing = await Listing.findById(id);
    res.render('./product/product-edit', {listing});
}));

// edit listing put route for seller
router.put("/product-edit/:id", validateListing, wrapAsync( async(req, res)=>{
    let id = req.params.id;
    let {title, category, price, bulletPoints, images, description} = req.body;
    let updatedListing = await Listing.findByIdAndUpdate(id,
        {
        title : title,
        category: category,
        price : price,
        bulletPoints : bulletPoints,
        images : images,
        description : description
    });
    updatedListing.save();
    res.redirect(`/product-show/${updatedListing._id}`);
}));

// delete listing route for seller
router.delete('/product-delete/:id', wrapAsync( async(req, res)=>{
    let id=req.params.id;
        await Listing.findOneAndDelete(id);
        res.redirect('/seller-portal');
}));


// create listing get route
router.get('/create-listing', (req, res)=>{
    res.render('./product/create-listing');
})

// create listing post route
router.post('/create-listing', validateListing, wrapAsync( async(req, res)=>{
    let {title, category, price, bulletPoints, images, description} = req.body;
    let newListing = await Listing.create({
        title : title,
        category: category,
        price : price,
        bulletPoints : bulletPoints,
        images : images,
        description : description
    });
    newListing.save();
    res.redirect('/');
}));

module.exports = router;