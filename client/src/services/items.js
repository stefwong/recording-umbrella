import axios from 'axios'
import { getBaseApiUrl } from '../util/Settings'
const baseUrl = `${getBaseApiUrl()}api/items`

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const getById = id => {
    const req = axios.get(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const create = async itemObj => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.post(baseUrl, itemObj, config)
    return res.data
} 

const update = (id, itemObj) => {
    const req = axios.put(`${baseUrl}/${id}`, itemObj)
    return req.then(res => res.data)
}

const remove = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

export default { getAll, getById, create, update, remove, setToken }