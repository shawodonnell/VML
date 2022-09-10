const express = require('express');
const router = express.Router();
const WebServices = require('../services/WebServices');
const OpenWeather = require("../models/OpenWeather");
const PostcodeIO = require("../models/PostcodeIO");
const Request = require("../models/Request");


//ROUTER HANDLERS 
router.get('/:postcodes', async (req, res) => {

    var locationServices = await new WebServices(new Request, new PostcodeIO(req.params.postcodes));
    var weatherServices = await new WebServices(new Request, new OpenWeather());

    var locationData = await locationServices.serviceRequest()
        .catch((err) => {
            res.status(501).send({ message: "General Error", Error: err.message })
            throw new Error("General Error: " + err.message);
        });

    var weatherData = await weatherServices.serviceRequest(locationData)
        .catch((err) => {
            res.status(501).send({ message: "General Error", Error: err.message })
            throw new Error("General Error: " + err.message);
        });

    res.status(200).send({
        message: "Success",
        location: locationData,
        weather: weatherData
    })
})

//BULK SEARCH - placeholder endpoint
router.get('/', async (req, res) => {

    var locationServices = await new WebServices(new Request, new PostcodeIO(req.body.postcodes))
    var weatherServices = await new WebServices(new Request, new OpenWeather())

    var locationData = await locationServices.serviceRequest()
        .catch((err) => {
            res.status(501).send({ message: "General Error", Error: err.message })
            throw new Error("General Error: " + err.message);
        });

    var weatherData = await weatherServices.serviceRequest(locationData)
        .catch((err) => {
            res.status(501).send({ message: "General Error", Error: err.message })
            throw new Error("General Error: " + err.message);
        });

    res.status(200).send({
        message: "Success",
        location: locationData,
        weather: weatherData
    })
})



module.exports = router;