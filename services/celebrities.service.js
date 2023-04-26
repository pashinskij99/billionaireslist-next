import { axiosClassic } from '../api/api'

export const CelebritiesService = {
  async getCelebrities(params) {
    return axiosClassic.get('/celebrities', {
      params: params,
    })
  },
  async getCelebrityById(id) {
    return axiosClassic.get(`/celebrities/${id}`)
  },
  async getFeaturedCelebrities(params) {
    return axiosClassic.get('/celebrities/featured', {
      params: params,
    })
  },
  async getNewestCelebrities(params) {
    return axiosClassic.get('/celebrities/newest', {
      params: params,
    })
  },
  async getRankingCelebrities(params) {
    return axiosClassic.get('/celebrities/ranking', {
      params: params,
    })
  },
}
