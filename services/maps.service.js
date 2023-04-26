import { axiosClassic } from '../api/api'

export const MapsService = {
  async getGoogleMaps() {
    return axiosClassic.get('/googlemaps')
  },
}
