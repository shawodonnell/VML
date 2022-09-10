const PostcodeIO = require("../models/PostcodeIO");

//Test Data
const postcode_Test = 'BT536DF';
const postcodes_Test = ["OX49 5NU", "M32 0JG", "NE30 1DP"];
const single_format_data_test = {
    result: {
        postcode: 'BT53 6DF',
        longitude: -6.52121,
        latitude: 55.078014,
    }
}

const bulk_format_data_test = {
    status: 200,
    result: [
        {
            query: 'OX49 5NU', result: {
                postcode: 'OX49 5NU',
                longitude: -1.069752,
                latitude: 51.655929
            }
        },
        {
            query: 'M32 0JG', result: {
                postcode: 'M32 0JG',
                longitude: -2.302836,
                latitude: 53.455654
            }
        },
        {
            query: 'NE30 1DP', result: {
                postcode: 'NE30 1DP',
                longitude: -1.439269,
                latitude: 55.011303
            }
        }
    ]
}

//INSTANTIATION OF CLASS UNDER TEST
const SinglePostCode_Test = new PostcodeIO(postcode_Test);
const BulkPostCodes_Test = new PostcodeIO(postcodes_Test);
const NoPostCode_Test = new PostcodeIO();

//Class function test - getURLData()
test("getURLData() - GET - Success", async () => {
    var response = await SinglePostCode_Test.getURLData()
    expect(response).toEqual({ url: 'https://api.postcodes.io/postcodes/BT536DF', method: 'GET' })
})

test("getURLData() - POST - Success", async () => {
    var response = await BulkPostCodes_Test.getURLData()
    expect(response).toEqual({ url: 'https://api.postcodes.io/postcodes/', postcodes: ['OX49 5NU', 'M32 0JG', 'NE30 1DP'], method: 'POST' })
})

test("getURLData() - GET - Failure", async () => {
    var response = await NoPostCode_Test.getURLData()
    expect(response).not.toEqual({ url: 'https://api.postcodes.io/postcodes/BT536DF', method: 'GET' })
})


//Class function test - formatResponse
test("formatResponse() - Single object - Success", async () => {
    var response = await SinglePostCode_Test.formatResponse(single_format_data_test);
    expect(response).toEqual({ latitude: 55.078014, longitude: -6.52121, postcode: 'BT53 6DF' })
})

test("formatResponse() - Bulk object - Success", async () => {
    var response = await BulkPostCodes_Test.formatResponse(bulk_format_data_test);
    expect(response).toEqual([
        { latitude: 51.655929, longitude: -1.069752, postcode: 'OX49 5NU' },
        { latitude: 53.455654, longitude: -2.302836, postcode: 'M32 0JG' },
        { latitude: 55.011303, longitude: -1.439269, postcode: 'NE30 1DP' }
      ])

})

test("formatResponse() - Single object - Failure", async () => {
    try {
        await SinglePostCode_Test.formatResponse();
    } catch (error) {
        expect(error.message).toEqual("Missing Data - PostCodeIO:formatResponse")
    }
})