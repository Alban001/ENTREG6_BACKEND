const express = require('express');
const userRouter = require('../routes/user.router');
const reviewRouter = require('../routes/review.router');
const imageRouter = require('../routes/image.router');
const hotelRouter = require('../routes/hotel.router');
const cityRouter = require('../routes/city.router');
const bookingRouter = require('../routes/booking.router');

const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use(reviewRouter);
router.use(imageRouter);
router.use(hotelRouter);
router.use(cityRouter);
router.use(bookingRouter);


module.exports = router;