import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)
    },
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

export const { createAnecdote, incrementVote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
