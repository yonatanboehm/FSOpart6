import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotif(state, action) {
      return action.payload
    },
    clear(state, action) {
      return ''
    }
  }
})

export const { displayNotif, clear } = notificationSlice.actions

export const notify = (content, time) => {
  return async dispatch => {
    dispatch(displayNotif(content))
    setTimeout(() => {
        dispatch(clear())
    }, time*1000)
  }
}

export default notificationSlice.reducer
