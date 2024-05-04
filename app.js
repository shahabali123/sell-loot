const express = require( 'express' );
const path = require('path');
const mongoose = require( 'mongoose' );
const session =  require("express-session");
const methodoverride = require('method-override');
const ExpressError = require('./utils/ExpressError.js');
const loginSignupSeller = require('./routes/login-signup-seller.js');
const loginSignupUser = require('./routes/login-signup-user.js');
const listingForSeller = require('./routes/listing-for-seller.js');
const listingForUser = require('./routes/listing-for-user.js');
const review = require('./routes/review.js');


const port = 3000;

const app = express();

// logger middleware
// app.use((req, res, next)=>{
//     console.log( `${new Date().toISOString()} - ${req.method} request made for ${req.path}`);
//     return next();
// })

// mongoDB local connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/SELL-LOOT');
}; 

main().then(console.log("DB connection successfull"))
.catch(err =>  console.log(err)); 
// _______________

app.use( express.static( __dirname + '/public' ));
app.use( express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodoverride("_method"));








app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});


// session section
const sessionOptions = {
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
// _________________________________________________

app.use('/', loginSignupUser);
app.use('/', loginSignupSeller);
app.use('/', listingForUser);
app.use('/', listingForSeller);
app.use('/', review);



// default err handler for unknown routes
app.all("*", (req, res , next)=>{
    next(new ExpressError(404, "Page not found!"));
})

// error handling middleware
app.use((err, req, res, next)=>{
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.render('./error/error.ejs', {err});
    next();
})