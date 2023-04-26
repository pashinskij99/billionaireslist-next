import { axiosClassic } from '../api/api'

export const TagsService = {
  async getTags() {
    return axiosClassic.get('/tags')
  },
}
