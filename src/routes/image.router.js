const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const imageController = require('../controllers/image.controller');

const imageRouter = express.Router();

imageRouter.route('/images')
    .post(verifyJWT, imageController.uploadImage);

module.exports = imageRouter;
