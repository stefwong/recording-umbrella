// import api from './apiConfig'

// export const getItems = async () => {
//     try {
//         const resp = await api.get('/api/items')
//         console.log(resp)
//         return resp.data
//     } catch (error) {
//         throw error
//     }
// }

// export const getItemById = async id => {
//     try {
//         const resp = await api.get(`/items/${id}`)
//         return resp.data.item
//     } catch (error) {
//         throw error
//     }
// }

// export const createItem = async item => {
//     try {
//         const resp = await api.post('/items', item)
//         console.log(resp.data)
//         return resp
//     } catch (error) {
//         throw error
//     }
// }

// export const updateItem = async (id, item) => {
//     try {
//         const resp = await api.put(`/items/${id}`, item)
//         return resp.data
//     } catch (error) {
//         throw error
//     }
// }

// export const deleteItem = async id => {
//     try {
//         const resp = await api.delete(`/items/${id}`)
//         return resp.data
//     } catch (error) {
//         throw error
//     }
// }

import axios from 'axios'
const baseUrl = 'api/items'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl)
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

export default { getAll, create, update, remove, setToken }