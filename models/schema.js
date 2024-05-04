const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync');

// Listing Schema
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bulletPoints: [{
    type: String,
    required: true,
  }],
  images:[{
    type: String,
  }],
  rating: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating',
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    // required: true,
  },
  category:{
    type: String,
    required: true,
  }
});


// Seller Schema
const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  }],
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem',
  }],
});



// CartItem Schema
const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// rating Schema
const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  },
})



const Listing = mongoose.model('Listing', listingSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const User = mongoose.model('User', userSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const  Rating = mongoose.model("Rating",ratingSchema);


listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing && listing.rating.length > 0) {
    try {
      let res = await Rating.deleteMany({ _id: { $in: listing.rating } });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = {
  Listing,
  Seller,
  User,
  CartItem,
  Rating,
};
