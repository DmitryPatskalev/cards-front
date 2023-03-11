import axios from 'axios'

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:7542/2.0/'
  //     : 'https://neko-back.herokuapp.com/2.0/',

  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  // baseURL: 'http://localhost:7542/2.0/',

  withCredentials: true,
})

export const authAPI = {
  register(data: LoginParamsType) {
    return instance.post<UserParamsType>('auth/register', data)
  },
  login(data: LoginParamsType) {
    return instance.post<UserParamsType>('auth/login', data)
  },
  logout() {
    return instance.delete<LogoutType>('auth/me', {})
  },
  me() {
    return instance.post<UserParamsType>('auth/me', {})
  },
  update(name: string) {
    return instance.put<UpdateUserType>('auth/me', { name })
  },
  recovery(data: ForgotPasswordParamsType) {
    return instance.post('auth/forgot', data)
  },
  newPassword(password: string, resetPasswordToken: string) {
    return instance.post<NewPasswordType>('auth/set-new-password', {
      password,
      resetPasswordToken,
    })
  },
}

export type LoginParamsType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}

export type ForgotPasswordParamsType = {
  email: string // кому восстанавливать пароль
  from?: string
  message: string
}

export type NewPasswordType = {
  info: string
  error: string
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

export type LogoutType = {
  error: string
  in: string
}

export type UpdateUserType = {
  updatedUser: UserParamsType
  token: string
  tokenDeathTime: number
}
