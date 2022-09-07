const httpRequest = require('./httpRequest')

//naming function to make it easier to test
let getCoordinatesFromPostCode = async (postcode) => {
    
    var request = await httpRequest.getRequest(`https://api.postcodes.io/postcodes/${postcode}`)
                        .then((res)=> {return res})
    console.log(request);
};



module.exports = {getCoordinatesFromPostCode} 