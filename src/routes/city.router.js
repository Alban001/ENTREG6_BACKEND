const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const cityController = require('../controllers/city.controller');

const cityRouter = express.Router();

cityRouter.route('/cities')
    .get(cityController.getAllCities)
    .post(verifyJWT, cityController.createCity);

cityRouter.route('/cities/:id')
    .get(cityController.getCityById)
    .put(verifyJWT, cityController.updateCity)
    .delete(verifyJWT, cityController.deleteCity);

module.exports = cityRouter;
