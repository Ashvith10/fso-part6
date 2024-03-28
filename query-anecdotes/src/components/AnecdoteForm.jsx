import { createAnecdote } from '../services/anecdote'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext, { useNotify } from '../context/notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notifyWith(`you created '${newAnecdote.content}'`, 5)
    },
    onError: (err , variables , context) => {
      const errorMsg = err.response.data.error
      notifyWith(errorMsg, 5)
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
