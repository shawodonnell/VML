class WebServices {

    constructor(request, userService) {
        this.request = request;
        this.userService = userService;
    }

    async serviceRequest(contextData) {

        return await this.configureHTTPRequest(contextData)
            .then(async requestData => await this.sendHTTPRequest(requestData))
            .then(async responseData => await this.formatReponseData(responseData))
            .then(formattedData => formattedData)
    }

    async configureHTTPRequest(contextData = {}) {
        return await
            this.userService.getURLData(contextData)
                .then(data => data)
                .catch((err) => {
                    throw new Error("Config Error: " + err.message)
                })
    }

    async sendHTTPRequest(requestData) {
        return await
            this.request.send(requestData)
                .then(data => data)
                .catch((err) => {
                    throw new Error("Sending Request Error: " + err.message)
                })
    }

    async formatReponseData(responseData) {
        return await
            this.userService.formatResponse(responseData)
                .then(data => data)
                .catch((err) => {
                    throw new Error("Formatting Error: " + err.message)
                })
    }
}

module.exports = WebServices;