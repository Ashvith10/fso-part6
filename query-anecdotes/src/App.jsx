import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdote'
import { useContext } from 'react'
import NotificationContext, { useNotify } from './context/notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],
        anecdotes.map(anecdote =>
          (anecdote.id === updatedAnecdote.id)
            ? updatedAnecdote
            : anecdote
        )
      )
      notifyWith(`you voted '${updatedAnecdote.content}'`, 5)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
