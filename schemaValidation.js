const Joi = require('joi');

const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    bulletPoints: Joi.array().items(Joi.string().required()),
    images: Joi.array().items(Joi.string()), // Optional
    rating: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)), // Optional
    seller: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming seller is a single ObjectId
    category: Joi.string().required(),
});

const sellerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});


module.exports = {listingSchema, sellerSchema};
