import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAll ,vote } from './requests'
import { useNotificationDispatch } from './NotifictaionContext'

const App = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote))
      notificationDispatch({type: "NOTIFY", payload: `anecdote '${newAnecdote.content}' voted`})
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" })
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteAnecdoteMutation.mutate(votedAnecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  if (result.isError) {
    return <div>anecdote server not available due to problems in server</div>
  }



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
