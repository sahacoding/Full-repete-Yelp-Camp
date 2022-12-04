const express = require ('express');
const router = express.Router();
const User = require ('../models/user');
const catchAsync = require ('../utils/catchAsync');
const passport = require ('passport');
const Usersg = require ('../controller/usersg');

router.get('/register', Usersg.registerformGet);

router.post('/register', catchAsync(Usersg.registerformPost ))

router.get('/login', Usersg.loginformGet)

router.post('/login', passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), Usersg.loginformPost)

router.get('/logout', Usersg.logoutForm );

module.exports = router;

// module.exports.loginformPost =  (req, res) =>{
//     req.flash('success', 'Welcome back');
//     const redirectUrl = req.session.returnTo || '/campground'; 
//     res.redirect(redirectUrl)
// }

// router.route('/register')
//     .get( Usersg.registerformGet)
//     .post( Usersg.registerformPost)

// router.route('/login')
//      .get( Usersg.loginformGet)
//      .post( passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), Usersg.loginformPost)

// router.get('/logout',  Usersg.logoutForm );
    
