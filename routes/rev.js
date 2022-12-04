const express = require ('express');
const router = express.Router({mergeParams: true});
const Campgrounds = require ('../models/campground');
const Review = require('../models/review');
const catchAsync = require ('../utils/catchAsync');
const ExpressError = require ('../utils/ExpressError');
const {camSchema, revSchema} = require('../schemas.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');

const Revg = require ('../controller/revg');





router.post('/', isLoggedIn, validateReview, catchAsync(Revg.reviewPost));
 
  router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(Revg.reviewDelete))

   module.exports = router;