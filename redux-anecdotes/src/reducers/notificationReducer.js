import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify(state, action) {
      return `You voted '${action.payload}'`
    },
    clear(state, action) {
      if (state.notification === null) {
          return
      }
      return null
    }
  }
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer
