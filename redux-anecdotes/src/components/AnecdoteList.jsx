import { useSelector, useDispatch } from 'react-redux'
import { vote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const anecdotesList = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotesList.filter(anecdote => anecdote.content.includes(filter))
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  const notification = useSelector(state => state.notification)
  
  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(notify(`You voted '${anecdote.content}'`, 5))
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
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
