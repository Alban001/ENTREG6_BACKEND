const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const hotelController = require('../controllers/hotel.controller');

const hotelRouter = express.Router();

hotelRouter.route('/hotels')
    .get(hotelController.getAllHotels)
    .post(verifyJWT, hotelController.createHotel);

hotelRouter.route('/hotels/:id')
    .get(hotelController.getHotelById)
    .put(verifyJWT, hotelController.updateHotel)
    .delete(verifyJWT, hotelController.deleteHotel);

module.exports = hotelRouter;
