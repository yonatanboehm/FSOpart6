import { useEffect } from 'react'
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import FilterVisibility from './components/FilterVisibility'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes =>
      dispatch(setNotes(notes))
    )    
  }, [])
  return (
    <div>
      <NewNote />
      <FilterVisibility />
      <Notes />
    </div>
  )
}

export default App