import { axiosClassic } from '../api/api'

export const DefaultService = {
  async getStatistics(params) {
    return axiosClassic.get('/statistics', { params: params })
  },
  async getProfessionsStatistics(params) {
    return axiosClassic.get('/statistics/professions', { params: params })
  },
  async getNationalitiesStatistics(params) {
    return axiosClassic.get('/statistics/nationalities', { params: params })
  },
  async getSubCategoriesStatistics(params) {
    return axiosClassic.get('/statistics/subcategories', { params: params })
  },
  async getGenderStatistics(params) {
    return axiosClassic.get('/statistics/genders', { params: params })
  },
  async getCategoriesStatistics(params) {
    return axiosClassic.get('/statistics/categories', { params: params })
  },
  async getAgesStatistics(params) {
    return axiosClassic.get('/statistics/ages', { params: params })
  },
  async getPosts(params) {
    return axiosClassic.get('/posts', { params: params })
  },
  async getPostById(id) {
    return axiosClassic.get(`/posts/${id}`)
  },
}
