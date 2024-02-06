import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import anecdoteServices from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteServices.createNew(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
