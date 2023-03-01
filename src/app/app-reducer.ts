import { authAPI, LoginParamsType } from '../api/cards -api'
import { errorUtils } from '../common/utils/error/error-utils'

import { AppThunk } from './store'

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

const initialState = {
  data: [] as UserParamsType[],
  error: null as string | null,
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsAppType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET_LOGIN':
      return { ...state, data: action.data }
    case 'login/SET_ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export const setLoginAC = (data: UserParamsType[]) => ({ type: 'login/SET_LOGIN', data } as const)

export const setAppErrorAC = (error: string | null) => ({ type: 'login/SET_ERROR', error } as const)

export type ActionsAppType = ReturnType<typeof setLoginAC> | ReturnType<typeof setAppErrorAC>

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(data)

      console.log(res)
      dispatch(setLoginAC(res.data))
    } catch (error: any) {
      console.log(error.response.data)
      errorUtils(error, dispatch)
    }
  }
