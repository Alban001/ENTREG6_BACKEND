const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const bookingController = require('../controllers/booking.controller');

const bookingRouter = express.Router();

bookingRouter.route('/bookings')
    .get(verifyJWT, bookingController.getAllBookings)
    .post(verifyJWT, bookingController.createBooking);

bookingRouter.route('/bookings/:id')
    .get(verifyJWT, bookingController.getBookingById)
    .put(verifyJWT, bookingController.updateBooking)
    .delete(verifyJWT, bookingController.deleteBooking);

module.exports = bookingRouter;
