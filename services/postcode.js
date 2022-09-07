const httpRequest = require('./httpRequest')

//naming function to make it easier to test
let getCoordinatesFromPostCode = async (postcode) => {
    
    return await httpRequest.getRequest(`https://api.postcodes.io/postcodes/${postcode}`)
                        .then((data)=> {return {long:data.longitude, lat: data.latitude}})
};

module.exports = {getCoordinatesFromPostCode} 