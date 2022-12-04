const express = require ('express');
const router = express.Router();
const Campgrounds = require ('../models/campground');
const catchAsync = require ('../utils/catchAsync');
const ExpressError = require ('../utils/ExpressError');
const {camSchema, revSchema} = require('../schemas.js');
const {isLoggedIn, validateCampground,  isAuthor} = require('../middleware');
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const {storage} = require('../cloudinary')
 const upload = multer ({ storage})

const Campg = require('../controller/campg');


router.route('/')
.get( catchAsync(Campg.index))
 .post( isLoggedIn, upload.array('image'), validateCampground, catchAsync(Campg.newformPost))
// .post(upload.array('image'), (req, res) =>{
//     console.log(req.body, req.files);
//     res.send("It Worked!!!!!")
// })

router.get('/new', isLoggedIn, Campg.newForm)

router.route('/:id')
.get( catchAsync( Campg.newformShow))
.put( isLoggedIn, isAuthor, upload.array('image'), validateCampground,  catchAsync(Campg.newformUpdate))
.delete( isLoggedIn, isAuthor,  catchAsync(Campg.newformDelete))



router.get('/:id/edit', isAuthor,   catchAsync(Campg.newformEdit))

module.exports = router;


