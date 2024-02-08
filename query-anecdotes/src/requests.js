import axios from 'axios'

export const getAll = () =>
  axios.get('http://localhost:3001/anecdotes').then(response => response.data)

export const createNew = (newAnecdote) => 
  axios.post('http://localhost:3001/anecdotes', newAnecdote).then(response => response.data)

export const vote = (newAnecdote) =>
  axios.put(`http://localhost:3001/anecdotes/${newAnecdote.id}`, newAnecdote).then(response => response.data)


