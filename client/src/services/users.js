import axios from 'axios'
const baseUrl = 'api/users'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const getById = (id) => {
  const req = axios.get(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const create = async userObj => {
  const res = await axios.post(baseUrl, userObj)
  return res.data
}

const update = async userObj => {
  const res = await axios.put(baseUrl, userObj)
  return res.data
}

const remove = id => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

export default { getAll, create, getById, update, remove }