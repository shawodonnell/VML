const Weather = require('../models/OpenWeather')

//TEST DATA
const single_UrlData_Test = { latitude: 55.078014, longitude: -6.52121, postcode: 'BT53 6DF' }
const bulk_UrlData_Test = [
    { latitude: 51.655929, longitude: -1.069752, postcode: 'OX49 5NU' },
    { latitude: 53.455654, longitude: -2.302836, postcode: 'M32 0JG' },
    { latitude: 55.011303, longitude: -1.439269, postcode: 'NE30 1DP' }
  ]
const single_formatData_Test = {
    location: {
      name: 'Ballymoney',
      country: 'United Kingdom',
    },
    current: {
      temp_c: 17.7,
      condition: {
        text: 'Partly cloudy',
      },
      wind_mph: 6.5
    }}
const multiple_formatData_Test = [
    {
      location: {
        name: 'Brightwell Baldwin',
        country: 'United Kingdom',
      },
      current: {
        temp_c: 21,
        condition: {
            text: 'Light rain'
          },
        wind_mph: 6.9,
      }
    },
    {
      location: {
        name: 'Gorse Hill',
        country: 'United Kingdom',
      },
      current: {
        last_updated_epoch: 1662831000,
        last_updated: '2022-09-10 18:30',
        temp_c: 18,
        condition: {
            text: 'Sunny'
          },
        wind_mph: 3.8,
        }
    },
    {
      location: {
        name: 'North Shields',
        country: 'United Kingdom',
      },
      current: {
        temp_c: 15,
        condition: {
            text: 'Partly cloudy'
          },
        wind_mph: 8.1,
      }
    }
  ]
let  weather;
//INSTANTIATION OF CLASS UNDER TEST
beforeEach(()=>{
    process.env.WEATHER_API_KEY = '477387f924c14818886115548220909'
    weather = new Weather();    
})

//URLDATA
test("GET - Weather for single location - Success", async ()=>{
    var response = await weather.getURLData(single_UrlData_Test);
    expect(response).toEqual({
        url: 'http://api.weatherapi.com/v1/current.json?key=477387f924c14818886115548220909&q=55.078014,-6.52121',
        method: 'GET'
      })
})

test("GET - Weather for Mulitple locations - Success", async ()=>{
    var response = await weather.getURLData(bulk_UrlData_Test);
    expect(response).toEqual([
        {
          url: 'http://api.weatherapi.com/v1/current.json?key=477387f924c14818886115548220909&q=51.655929,-1.069752',
          method: 'GET'
        },
        {
          url: 'http://api.weatherapi.com/v1/current.json?key=477387f924c14818886115548220909&q=53.455654,-2.302836',
          method: 'GET'
        },
        {
          url: 'http://api.weatherapi.com/v1/current.json?key=477387f924c14818886115548220909&q=55.011303,-1.439269',
          method: 'GET'
        }
      ])
})

test("GET - Weather for single location - Failure", async ()=>{
    try {
        await weather.getURLData();
    } catch (error) {
        expect(error.message).toEqual("Missing Data - Open Weather:getURL")
    }    
})

//FORMATTING 
test("FormatReponse - Single Object - Success", async ()=>{
    var response = await weather.formatResponse(single_formatData_Test)
    expect(response).toEqual({
        location: 'Ballymoney',
        country: 'United Kingdom',
        tempC: 17.7,
        windSpeed: 6.5,
        condition: 'Partly cloudy'
      })
})

test("FormatResponse - Multiple Objects - Success", async ()=>{
    var response = await weather.formatResponse(multiple_formatData_Test);
    expect(response).toEqual([
        {
          location: 'Brightwell Baldwin',
          country: 'United Kingdom',
          tempC: 21,
          windSpeed: 6.9,
          condition: 'Light rain'
        },
        {
          location: 'Gorse Hill',
          country: 'United Kingdom',
          tempC: 18,
          windSpeed: 3.8,
          condition: 'Sunny'
        },
        {
          location: 'North Shields',
          country: 'United Kingdom',
          tempC: 15,
          windSpeed: 8.1,
          condition: 'Partly cloudy'
        }
      ])
})

test("FormatReponse - Single Object - Failure", async ()=>{
    
    try {
        await weather.formatResponse()
    } catch (error) {
        expect(error.message).toEqual("Missing Data - Open Weather:formatResponse")
    }
})