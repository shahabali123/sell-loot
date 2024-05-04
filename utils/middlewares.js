const {listingSchema, sellerSchema}= require('../schemaValidation');
const ExpressError = require('./ExpressError');

// schema validation middlewares
module.exports.validateListing = (req, res , next)=>{
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if (error){
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
};

module.exports.validateSeller = (req, res, next) =>{
    let {error} = sellerSchema.validate(req.body);
    console.log(error);
    if (error){
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
};