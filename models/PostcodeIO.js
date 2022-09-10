class PostcodeIO {

    constructor(postcodes) {
        this.url = 'https://api.postcodes.io/postcodes/';
        this.postcodes = postcodes;
        this.method = typeof postcodes === 'string' ? "GET":"POST";
    }

    async getURLData() {

        switch (this.method) {
            case "GET":
                return {
                    url: this.url + this.postcodes,
                    method: this.method
                }
            case "POST":
                return {
                    url: this.url,
                    postcodes: this.postcodes,
                    method: this.method
                }
            default:
                break;
        }
    }

    async formatResponse(responseData) {

        if(responseData==null){
            throw new Error("Missing Data - PostCodeIO:formatResponse");
        }
                
        //SINGLE POSTCODE FORMATTING
        if(Object.keys(responseData.result).includes('latitude')
        && Object.keys(responseData.result).includes('longitude') 
        && Object.keys(responseData.result).includes('postcode')){
            return {
                latitude:responseData.result.latitude,
                longitude:responseData.result.longitude,
                postcode: responseData.result.postcode
            }
        }

        //BULK POSTCODE FORMATTING
        var results = []
        var result = {}

        for (let i = 0; i < Object.keys(responseData.result).length; i++) {
            result = {
                latitude:responseData.result[i].result.latitude,
                longitude: responseData.result[i].result.longitude,
                postcode: responseData.result[i].result.postcode
            }
            results.push(result)
            result = {}       
        }
        return results
    }


}

module.exports = PostcodeIO