const catchError = require('../utils/catchError');
const { Op } = require('sequelize');
const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const Image = require('../models/Image');
const City = require('../models/City');

const getAllReviews= catchError(async (req, res) => {
    const { name, cityId } = req.query;
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (cityId) where.cityId = cityId;
    const hotels = await Hotel.findAll({
        where,
        include: [Image, City, { model: Review, as: 'reviews' }], 
    });
    const hotelsWithAvgPromises = hotels.map(async (hotel) => {
        const hotelJSON = hotel.toJSON();
        const reviews = hotelJSON.reviews || [];  
        const average = reviews.length > 0 ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length : 0;
        return {
            ...hotelJSON,
            average: average.toFixed(2),
        };
    });
    const hotelsWithAvg = await Promise.all(hotelsWithAvgPromises);
    return res.json(hotelsWithAvg);
});

module.exports = {
    getAllReviews,
};
