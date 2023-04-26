import { axiosClassic } from '../api/api'

export const SettingsService = {
  async getSettings() {
    return axiosClassic.get('/settings')
  },
}
