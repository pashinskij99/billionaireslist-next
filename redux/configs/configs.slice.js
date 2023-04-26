import { createSlice } from '@reduxjs/toolkit'
import { getConfigs } from './configs.actions'
import nookies, { setCookie } from 'nookies'

const initialState = {
  categories: [],
  settings: {},
  newestCelebrities: [],
  isLoading: true,
  celebrityId:
    typeof window !== 'undefined'
      ? localStorage.getItem('lastCelebrityId')
        ? localStorage.getItem('lastCelebrityId')
        : null
      : null,
}

export const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setCelebrityId(state, { payload }) {
      state.celebrityId = payload
      localStorage.setItem('lastCelebrityId', payload)
      setCookie(null, 'billionerCelebrityId', payload, {
        maxAge: 30*24*60*60,
        path: '/'
      })
    },
  },
  extraReducers: {
    [getConfigs.fulfilled]: (state, { payload }) => {
      state.categories = payload.categories

      state.settings = payload.settings.reduce((acc, curr) => {
        Object.assign(acc, curr)
        return acc
      }, {})

      state.newestCelebrities = payload.newestCelebrities
      state.newestCelebrities.pop()

      state.isLoading = false
    },
    [getConfigs.pending]: (state) => {
      state.isLoading = true
    },
    [getConfigs.rejected]: (state) => {
      state.isLoading = false
    }
  }
})

export const { setCelebrityId } = configsSlice.actions

export default configsSlice.reducer
