import { axiosClassic } from '../api/api'

export const CategoriesService = {
  async getCategories() {
    return axiosClassic.get('/categories')
  },
  async getCategoriesMain() {
    return axiosClassic.get('/categories/main')
  },
}
