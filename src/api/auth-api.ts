import { instance } from 'api/instance'

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

export type LoginType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}

export type ForgotPasswordType = {
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
