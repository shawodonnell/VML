class OpenWeather {

    constructor() {
        this.method = 'GET';
        this.apiKey = process.env.WEATHER_API_KEY
    }

    async getURLData(contextData) {

        if(contextData==null){
            throw new Error("Missing Data - Open Weather:getURL");
        }

        //SINGLE POSTCODE REQUEST
        var isIterator = !(Symbol.iterator in Object(contextData))

        if (isIterator) {
            this.url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${contextData.latitude},${contextData.longitude}`
            return {
                url: this.url,
                method: this.method
            }
        }

        //BULK POST CODE SEARCH
        var requests = []
        var request = {}

        contextData.forEach(element => {
            this.latitude = element.latitude;
            this.longitude = element.longitude;
            this.url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${element.latitude},${element.longitude}`
            request = {
                url: this.url,
                method: this.method
            }
            requests.push(request);
        });

        return requests

    }

    async formatResponse(responseData) {

        if(responseData==null){
            throw new Error("Missing Data - Open Weather:formatResponse");
        }

        var isIterator = (Symbol.iterator in Object(responseData))

        //SINGLE RESPONSE
        if (!isIterator) {
            return {
                location: responseData.location.name,
                country: responseData.location.country,
                tempC: responseData.current?.temp_c,
                windSpeed: responseData.current?.wind_mph,
                condition: responseData.current?.condition.text,
            }
        }

        //BULK RESPONSE
        var responses = []
        var response = {}

        responseData.forEach(data => {
            response = {
                location: data.location.name,
                country: data.location.country,
                tempC: data.current?.temp_c,
                windSpeed: data.current?.wind_mph,
                condition: data.current?.condition.text,
            }
            responses.push(response);
        });

        return responses;

    }

}

module.exports = OpenWeather