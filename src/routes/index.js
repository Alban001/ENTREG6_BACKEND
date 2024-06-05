const express = require('express');
const userRouter = require('../routes/user.router');
const reviewRouter = require('../routes/review.router');
const imageRouter = require('../routes/image.router');
const hotelRouter = require('../routes/hotel.router');
const cityRouter = require('../routes/city.router');
const bookingRouter = require('../routes/booking.router');
const User = require('../models/User');
const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const City = require('../models/City');
const Image = require('../models/Image');

const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use(reviewRouter);
router.use(imageRouter);
router.use(hotelRouter);
router.use(cityRouter);
router.use(bookingRouter);

// relaciones aqui 
User.hasMany(Review);
Review.belongsTo(User);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.belongsTo(City);
City.hasMany(Hotel);

Booking.belongsTo(Booking);
Hotel.hasMany(Booking);

Image.belongsTo(Hotel);
Hotel.hasMany(Image);



module.exports = router;