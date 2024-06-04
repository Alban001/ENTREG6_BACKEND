const catchError = require('../utils/catchError');
const Hotel = require('../models/Hotel');

const getAll = catchError(async (req, res) => {
    const hotels = await Hotel.findAll();
    return res.json(hotels);
});

const create = catchError(async (req, res) => {
    const newHotel = await Hotel.create(req.body);
    return res.status(201).json(newHotel);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotel.findByPk(id);
    if (!hotel) return res.sendStatus(404);
    return res.json(hotel);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Hotel.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const [updatedCount, updatedHotel] = await Hotel.update(req.body, {
        where: { id },
        returning: true,
    });
    if (updatedCount === 0) return res.sendStatus(404);
    return res.json(updatedHotel[0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};
