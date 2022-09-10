const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

//REQUEST TEST 1 - GET - SINGLE POST CODE
mock.onGet("https://api.postcodes.io/postcodes/BT536DF").reply(200,
    { latitude: 55.078014, longitude: -6.52121, postcode: 'BT53 6DF' }
)

test("Axios GET request - Success", async () => {
    var response = await axios.get("https://api.postcodes.io/postcodes/BT536DF")
    expect(response.data).toEqual({ latitude: 55.078014, longitude: -6.52121, postcode: 'BT53 6DF' })
})

//REQUEST TEST 2 - POST - BULK POST CODE
mock.onPost("https://api.postcodes.io/postcodes/", {
    body: {"postcodes": ["OX49 5NU", "M32 0JG", "NE30 1DP"]}
}).reply(200, {"postcodes": ["OX49 5NU", "M32 0JG", "NE30 1DP"]})


test("Axios POST Request - Success", async () => {
    var response = await axios.post("https://api.postcodes.io/postcodes/", {
        body: {"postcodes": ["OX49 5NU", "M32 0JG", "NE30 1DP"]}})
    expect(response.data).toEqual({"postcodes": ["OX49 5NU", "M32 0JG", "NE30 1DP"]})
})

//REQUEST 3 - GET - FAILURE
test("Axios GET request - Failure", async () => {
    try {
        await axios.get("https://api.postcodes.io/postcodes/")
    } catch (error) {
        expect(error.message).toEqual("Request failed with status code 404")
    }
})
