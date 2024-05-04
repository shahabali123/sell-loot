const express = require('express');
const router  = express.Router();
const {Rating} = require("../models/schema.js");
const wrapAsync = require('../utils/wrapAsync.js');
const {Listing} = require("../models/schema.js");
const ExpressError = require('../utils/ExpressError.js');



// adding review
router.post('/reviews/:id', wrapAsync( async (req, res, next) => {
    
    let id = req.params.id;
    let { rating, comment } = req.body;

    // Create a new review
    let newReview = await Rating.create({
        rating: rating,
        comment: comment,
        listing: id,  // Assign the listing ID to the review
    });

    // Find the listing by ID
    let listing = await Listing.findById(id);

    // Assign the new review to the listing's rating field
    listing.rating.unshift(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/product-show/${id}`);
}
));

//  deleting review
router.delete('/delete-review/:id', wrapAsync(async(req, res)=>{
const reviewId=req.params.id;
console.log(reviewId)
let delRev = await  Rating.findByIdAndDelete(reviewId);
console.log(delRev);
res.redirect('/');
}));

module.exports = router;