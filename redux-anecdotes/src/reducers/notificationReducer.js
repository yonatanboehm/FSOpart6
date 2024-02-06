import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return `You voted '${action.payload}'`
    },
    clear(state, action) {
      return ''
    }
  }
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer
