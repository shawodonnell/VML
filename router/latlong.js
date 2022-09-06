const express = require('express');
const { read } = require('fs');
const router = express.Router();
const postcodeSearch = require('../utils/postcode')
const weatherSearch = require('../utils/weather')

//middle ware for single post code
router.use('/:postcode',(req,res,next)=>{
    req.coords = postcodeSearch.getLatLongFromPostCode(req.params.postcode);
    next();
})

//SINGLE POST CODE
router.get('/:postcode',async (req,res)=>{

    let postcode = req.params.postcode;
    let coords = req.coords;

    if(!postcode) res.status(501).json({
        message: "No postcode entered"
    })
    
    //let coords2 = postcodeSearch.getLatLongFromPostCode(req.params.postcode);
    let weather = weatherSearch.getWeatherByLatLong(coords.lat, coords.long)

    console.log(coords,weather);

    res.json({coords,weather})
})

//BULK SEARCH
router.get('/', async (req,res) => {
    const postcodes = req.body.postcodes;

    if(!postcodes) res.status(501).json({
        message: "No postcodes found"
    })

    res.send("Success for bulk")

})



module.exports = router;