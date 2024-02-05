import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotesList = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotesList.filter(anecdote => anecdote.content.includes(filter)) 

  const dispatch = useDispatch()
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  const voteAnecdote = (id) => {
    dispatch(vote(id))
  }
  
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
