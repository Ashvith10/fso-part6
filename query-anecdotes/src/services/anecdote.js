import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (content) => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const updateAnecdote = async (object) => {
  const updatedObject = { ...object, votes: object.votes + 1 }
  const response = await axios.put(baseUrl + `/${object.id}`, updatedObject)
  return response.data
}
