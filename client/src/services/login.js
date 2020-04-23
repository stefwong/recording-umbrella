import axios from 'axios'
import { getBaseApiUrl } from '../util/Settings'
const baseUrl = `${getBaseApiUrl()}api/login`
// const baseUrl = "http://localhost:3001/api/login"

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { login }