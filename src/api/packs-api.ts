import axios from 'axios'

import {
  CardsDomainType,
  CardsPackDomainType,
  CardsParamsType,
  CreatePacksType,
  ForgotPasswordType,
  LoginType,
  LogoutType,
  NewPackType,
  NewPasswordType,
  PacksParamsType,
  UpdatedPackType,
  UpdateUserType,
  UserParamsType,
} from './typesAPI'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const authAPI = {
  register(data: LoginType) {
    return instance.post<UserParamsType>('/auth/register', data)
  },
  login(data: LoginType) {
    return instance.post<UserParamsType>('/auth/login', data)
  },
  logout() {
    return instance.delete<LogoutType>('/auth/me', {})
  },
  me() {
    return instance.post<UserParamsType>('/auth/me', {})
  },
  updateUserName(name: string) {
    return instance.put<UpdateUserType>('/auth/me', { name })
  },
  recovery(data: ForgotPasswordType) {
    return instance.post('/auth/forgot', data)
  },
  newPassword(password: string, resetPasswordToken: string) {
    return instance.post<NewPasswordType>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    })
  },
}

export const packsApi = {
  getPacks(params?: PacksParamsType) {
    return instance.get<CardsPackDomainType>('/cards/pack', { params })
  },
  createPack(data: NewPackType) {
    return instance.post<CardsPackDomainType>('/cards/pack', data)
  },
  updatedPack(data: UpdatedPackType) {
    return instance.put<CardsPackDomainType>('/cards/pack', data)
  },
  deletePack() {
    return instance.delete<CardsPackDomainType>('/cards/pack', {
      params: {
        id: '642aa72ca915a156406e9c20',
      },
    })
  },
}

export const cardsAPI = {
  getCards(params?: CardsParamsType) {
    return instance.get<CardsDomainType>('/cards/card', { params })
  },
  postCards(data: CreatePacksType) {
    return instance.post<CardsDomainType>('/cards/card', data)
  },
}

// baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
// baseURL:
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:7542/2.0'
//     : 'https://neko-back.herokuapp.com/2.0',
// baseURL: 'http://localhost:7542/2.0',
