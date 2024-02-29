import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.toSorted((x, y) => y.votes - x.votes))
  const dispatch = useDispatch()

  const vote = (id) => dispatch(incrementVote(id))

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList