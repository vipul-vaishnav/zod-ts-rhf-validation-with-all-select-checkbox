import axios from 'axios'

const getPosts = async <T>(url: string) => {
  const res = await axios.get<T>(url)
  return res.data
}

export { getPosts }
