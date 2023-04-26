import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectCategories = createDraftSafeSelector(
  (state) => state.configs,
  (state) => {
    return state.categories
  },
)

export const selectSettings = createDraftSafeSelector(
  (state) => state.configs,
  (state) => {
    return state.settings
  },
)

export const selectIsLoading = createDraftSafeSelector(
  (state) => state.configs,
  (state) => {
    return state.isLoading
  },
)

export const selectNewestCelebrities = createDraftSafeSelector(
  (state) => state.configs,
  (state) => {
    return state.newestCelebrities
  },
)
export const selectFavicon = createDraftSafeSelector(
  (state) => state.configs,
  (state) => {
    return state.settings.favicon
  },
)

export const selectCelebrityId = createDraftSafeSelector(
  (state) => state.configs,
  (state) => {
    return state.celebrityId
  },
)
