if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


const { application } = require('express');
const express = require('express');
const app = express();
const path = require('path');
 const Campgrounds = require ('./models/campground')
const mongoose = require('mongoose');
const methodOver = require('method-override')
const ejsMate = require ('ejs-mate');
const catchAsync = require ('./utils/catchAsync');
const ExpressError = require ('./utils/ExpressError');
const Joi = require ('joi');
const {camSchema, revSchema} = require('./schemas.js');
const Review = require('./models/review');
const Camps = require ('./routes/cam');
const Revs = require ('./routes/rev');
const userRoutes = require ('./routes/users')
const session = require ('express-session');
const flash = require ('connect-flash');
const passport = require ('passport');
const LocalStrategy = require ('passport-local');
const User = require ('./models/user');

mongoose.connect('mongodb://localhost:27017/yelp-campfull')
.then(()=>{
    console.log('Mongo Connection Open!!')
}).catch(err =>{
    console.log("Oh no Mongo Error!!")
    console.log(err)
})

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOver('_method'));
app.use(express.static(path.join(__dirname, 'public')));


const SessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly: true,
        expires : Date.now() + 100 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(SessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //  Generates a function that is used in Passport's LocalStrategy

passport.serializeUser(User.serializeUser()); // Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser()); // Generates a function that is used by Passport to deserialize users into the session


app.use((req, res, next) =>{
    // console.log(req.session)
     res.locals.currentUser = req.user;
     //console.log('thiss issss', currentUser)
     res.locals.success = req.flash('success');
     res.locals.error = req.flash('error');
     next();
 })



app.get('/makecampground', async(req, res) =>{
    const camp = new Campgrounds({tittle: 'My Backyard', description: 'cheap camping'});
    await camp.save();
    res.send(camp)
})

app.get('/', (req, res) =>{
    res.render('home')
})

app.use('/', userRoutes );
app.use('/campground', Camps);
app.use('/campground/:id/reviews', Revs)



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})

app.use((err, req, res, next) =>{
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh no Something Went Wrong'
    res.status(statusCode).render('error', {err})
   })

app.listen('3093',() =>{
    console.log('app listen on port 3093')
})