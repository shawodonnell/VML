const express = require('express');
const { read } = require('fs');
const router = express.Router();
const postcodeSearch = require('../services/postcode')
const weatherSearch = require('../services/weather')

//middle ware for single post code
router.use('/:postcode',(req,res,next)=>{
    req.postcode = req.params.postcode;
    next();
})

//SINGLE POST CODE
router.get('/:postcode',async (req,res)=>{

    if(!req.postcode) res.status(501).json({
        message: "No postcode entered"
    })
    
    postcodeSearch.getCoordinatesFromPostCode(req.postcode);
    res.end();

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