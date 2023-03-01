import axios from 'axios'

import { UserParamsType } from '../app/app-reducer'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
export const authAPI = {
  login(items: LoginParamsType) {
    return instance.post<UserParamsType[]>('auth/login', items)
  },
}
