import { axiosClassic } from '../api/api'

export const ContactsService = {
  async subscribe(body) {
    return axiosClassic.post('/contacts', body)
  },
}
