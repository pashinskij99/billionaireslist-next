import { axiosClassic } from '../api/api'

export const ProfessionsService = {
  async getProfessions() {
    return axiosClassic.get('/professions')
  },
}
