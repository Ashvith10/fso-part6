import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer.js'
import { setNotification, removeNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
                                anecdotes.filter(({ content }) =>
                                                 content.toLowerCase()
                                                 .includes(filter.toLowerCase()))
                                .toSorted((x, y) => y.votes - x.votes))

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
