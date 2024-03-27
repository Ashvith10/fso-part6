import { createAnecdote } from '../services/anecdote'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `you created '${newAnecdote.content}'`
      })
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (err , variables , context) => {
      const errorMsg = err.response.data.error
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: errorMsg
      })
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
