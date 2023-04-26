import { createAsyncThunk } from '@reduxjs/toolkit'
import { CategoriesService } from '../../services/categories.service'
import { CelebritiesService } from '../../services/celebrities.service'
import { SettingsService } from '../../services/settings.service'

export const getConfigs = createAsyncThunk('configs/getConfigs', async () => {
  const { data: settings } = await SettingsService.getSettings()
  const { data: categories } = await CategoriesService.getCategories()
  const { data: newestCelebrities } = await CelebritiesService.getNewestCelebrities()

  return { settings, categories, newestCelebrities }
})
