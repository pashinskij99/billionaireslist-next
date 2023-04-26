import axios from 'axios'
import { baseUrl } from '../configs/axios.config'
import { toast } from 'react-hot-toast'
import { errorCatch } from './helpers'

export const axiosClassic = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClassic.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast.error(errorCatch(error))
    return Promise.reject(error)
  },
)
