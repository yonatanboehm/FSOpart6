import { useEffect } from 'react'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import FilterVisibility from './components/FilterVisibility'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(initializeNotes())    
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