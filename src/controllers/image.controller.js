const catchError = require('../utils/catchError');
const Image = require('../models/Image');

const getAll = catchError(async (req, res) => {
    const images = await Image.findAll();
    return res.json(images);
});

const create = catchError(async (req, res) => {
    const newImage = await Image.create(req.body);
    return res.status(201).json(newImage);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if (!image) return res.sendStatus(404);
    return res.json(image);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Image.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const [updatedCount, updatedImage] = await Image.update(req.body, {
        where: { id },
        returning: true,
    });
    if (updatedCount === 0) return res.sendStatus(404);
    return res.json(updatedImage[0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};
