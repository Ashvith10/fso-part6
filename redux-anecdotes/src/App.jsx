import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, incrementVote } from './reducers/anecdoteReducer.js'

const App = () => {
  const anecdotes = useSelector(state => state.toSorted((x, y) => y.votes - x.votes))
  const dispatch = useDispatch()

  const vote = (id) => dispatch(incrementVote(id))

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
