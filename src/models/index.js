const User = require('./User');
const Review = require('./Review');
const Image = require('./Image');
const Hotel = require('./Hotel');
const City = require('./City');
const Booking = require('./Booking');

User.hasMany(Review);
Review.belongsTo(User);

Review.hasMany(Image);
Image.belongsTo(Review);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.belongsTo(City);
City.hasMany(Hotel);
