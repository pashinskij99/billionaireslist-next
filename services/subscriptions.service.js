import { axiosClassic } from '../api/api'

export const SubscriptionsService = {
  async postContacts(body) {
    return axiosClassic.post('/contacts', body)
  },
  async postSubscription(body) {
    return axiosClassic.post('/subscriptions', body)
  },
}
