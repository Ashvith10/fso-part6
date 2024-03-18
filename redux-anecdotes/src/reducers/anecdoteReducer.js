import anecdoteService from '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const updatedAnecdote = action.payload

      return state.map(anecdote =>
        (anecdote.id === updatedAnecdote.id)
          ? updatedAnecdote
          : anecdote
      )
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { incrementVote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(appendAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (object) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateOne(object)
    dispatch(incrementVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
