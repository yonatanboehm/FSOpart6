import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../requests"
import { useContext } from 'react'
import { useNotificationDispatch } from "../NotifictaionContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote) )
      notificationDispatch({type: "NOTIFY", payload: `anecdote '${newAnecdote.content}' created`})
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" })
      }, 5000)
    },
    onError: (error) => {
      notificationDispatch({type: "NOTIFY", payload: error.response.data.error })
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" })
      }, 5000)
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    try {
      newAnecdoteMutation.mutate({ content, votes: 0 })
    } catch(error) {
      console.log("kjsdnfksjf")
    }
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
