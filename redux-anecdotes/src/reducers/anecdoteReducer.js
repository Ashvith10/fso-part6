import anecdoteService from '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload

      return state.map(anecdote =>
        (anecdote.id !== id)
                       ? anecdote
                       : {
                           ...anecdote,
                           votes: anecdote.votes + 1
                         }
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

export default anecdoteSlice.reducer
