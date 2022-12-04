const Campgrounds = require ('../models/campground');
const Review = require('../models/review');

module.exports.reviewPost = async (req, res) =>{
    // res.send('You Made it')
      const creview = await Campgrounds.findById(req.params.id);
     const review = new Review(req.body.review);
     review.author = req.user._id;
      //console.log('55',review);
       creview.reviews.push(review);
     // console.log(creview.reviews)
      await review.save();
    await creview.save();
    res.redirect(`/campground/${creview._id}`);
  }

  module.exports.reviewDelete = async(req, res) =>{
    //res.send('Delete mee')
    const {id, reviewId} = req.params;
    await Campgrounds.findByIdAndUpdate(id, {$pull: { reviews:  reviewId}});
    await Review.findByIdAndDelete(reviewId);
    //req.flash('success', 'Successfully delete a review')
    res.redirect(`/campground/${id}`)
  }