import { configureStore } from '@reduxjs/toolkit'
import configsReducer from './configs/configs.slice'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    configs: configsReducer,
  },
})