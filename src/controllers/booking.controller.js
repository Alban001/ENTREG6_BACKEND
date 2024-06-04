const catchError = require('../utils/catchError');
const Booking = require('../models/Booking');

const getAll = catchError(async (req, res) => {
    const bookings = await Booking.findAll();
    return res.json(bookings);
});

const create = catchError(async (req, res) => {
    const newBooking = await Booking.create(req.body);
    return res.status(201).json(newBooking);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) return res.sendStatus(404);
    return res.json(booking);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Booking.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const [updatedCount, updatedBooking] = await Booking.update(req.body, {
        where: { id },
        returning: true,
    });
    if (updatedCount === 0) return res.sendStatus(404);
    return res.json(updatedBooking[0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};
