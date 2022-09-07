const axios = require('axios').default;

async function getRequest(url, params = {}) {

    const queryString = Object.entries(params).map(p=>{
        return `${params[0]}=${params[1]}`
    }).join('&')

    return axios.get(`${url}?${queryString}`).then((data)=>{return data.data.result})
    
}

module.exports = {getRequest}