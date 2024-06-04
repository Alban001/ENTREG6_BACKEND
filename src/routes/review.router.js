const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const reviewController = require('../controllers/review.controller');

const reviewRouter = express.Router();


reviewRouter.route('/reviews')
    .get(reviewController.getAllReviews)
    .post(verifyJWT, reviewController.createReview);

reviewRouter.route('/reviews/:id')
    .get(reviewController.getOneReview)
    .delete(verifyJWT, reviewController.removeReview)
    .put(verifyJWT, reviewController.updateReview);

module.exports = reviewRouter;

