import axios from 'axios'

import {
  CardsPackDomainType,
  ForgotPasswordParamsType,
  LoginParamsType,
  LogoutType,
  NewPackType,
  NewPasswordType,
  ParamsType,
  UpdatedPackType,
  UpdateUserType,
  UserParamsType,
} from './typesAPI'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const authAPI = {
  register(data: LoginParamsType) {
    return instance.post<UserParamsType>('/auth/register', data)
  },
  login(data: LoginParamsType) {
    return instance.post<UserParamsType>('/auth/login', data)
  },
  logout() {
    return instance.delete<LogoutType>('/auth/me', {})
  },
  me() {
    return instance.post<UserParamsType>('/auth/me', {})
  },
  update(name: string) {
    return instance.put<UpdateUserType>('/auth/me', { name })
  },
  recovery(data: ForgotPasswordParamsType) {
    return instance.post('/auth/forgot', data)
  },
  newPassword(password: string, resetPasswordToken: string) {
    return instance.post<NewPasswordType>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    })
  },
}

export const cardsAPI = {
  getPacks(params?: ParamsType) {
    return instance.get<CardsPackDomainType>('/cards/pack', { params })
  },
  createPack(data: NewPackType) {
    return instance.post<CardsPackDomainType>('/cards/pack', data)
  },
  updatedPack(data: UpdatedPackType) {
    return instance.put<CardsPackDomainType>('/cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete<CardsPackDomainType>(`/cards/pack/${id}`)
  },
}

// baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
// baseURL:
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:7542/2.0'
//     : 'https://neko-back.herokuapp.com/2.0',
// baseURL: 'http://localhost:7542/2.0',
