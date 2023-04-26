import { axiosClassic } from '../api/api'

export const QuotesService = {
  async getQuotes(params) {
    return axiosClassic.get('/quotes', {
      params: params,
    })
  },
  async getQuoteById(id) {
    return axiosClassic.get(`/quotes/${id}`)
  },
  async getPopularQuotes() {
    return axiosClassic.get('/quotes/popular')
  },
  async getSitemapQuotes(params) {
    return axiosClassic.get('/sitemap/quotes', { params })
  }
}
