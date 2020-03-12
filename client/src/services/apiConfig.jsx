import Axios from 'axios'

const JwtToken = localStorage.getItem('token') || null

let apiUrl

const apiUrls = {
    // production: 'https://name.herokuapp.com/api',
    development: 'http://localhost:3005/'
}

if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}

const api = Axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${JwtToken}`,
        'Access-Control-Allow-Origin': '*'
    }
})

export default api