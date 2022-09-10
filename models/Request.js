const axios = require('axios').default;

class Request {

    async send(requestData) {

        var isIterator = (Symbol.iterator in Object(requestData))

        //SINGLE SEARCH - GET REQUEST
        if (!isIterator && requestData.method === 'GET') {
            return await axios.get(requestData.url)
                .then((data) => data.data)
                .catch((err) => {
                    throw new Error("Request Error: " + err.message)
                })
        }

        // BULK SEARCH = POST REQUEST
        if (requestData.method === 'POST') {
            return await axios.post(requestData.url, {
                postcodes: requestData.postcodes
            })
                .then(data => data.data)
                .catch((err) => {
                    throw new Error("Request Error: " + err.message)
                })
        }

        //BULK SEARCH - GET REQUEST
        var responses = [];
        var response = {};

        for (let i = 0; i < requestData.length; i++) {
            const request = requestData[i];

            response = await axios.get(request.url)
                .then(data => data.data)
                .catch((err) => {
                    throw new Error("Request Error: " + err.message)
                })
            responses.push(response)
        }

        return responses
    }

}

module.exports = Request;