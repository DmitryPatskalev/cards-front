import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<UserParamsType[]>('/auth/login', data)
  },
  me() {
    return instance.post<UserParamsType[]>('/auth/me')
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserParamsType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}