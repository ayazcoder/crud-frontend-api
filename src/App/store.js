import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/slice/userDetailsSlice'

export const store = configureStore({

  reducer: {
    app: usersReducer,
  },
})