const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, update, remove } = require('../controllers/booking.controller');


const bookingRouter = express.Router();

bookingRouter.route('/bookings')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

bookingRouter.route('/bookings/:id')
    .put(verifyJWT, update)
    .delete(verifyJWT, remove);

module.exports = bookingRouter;
