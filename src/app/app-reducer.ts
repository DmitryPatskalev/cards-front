import { authAPI, LoginParamsType, UserParamsType } from '../api/cards -api'
import { errorUtils } from '../common/utils/error/error-utils'

import { AppThunk } from './store'

const initialState = {
  data: [] as UserParamsType[],
  error: null as string | null,
  isLoggedIn: false,
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsAppType
): InitialStateType => {
  switch (action.type) {
    case 'app/SET_LOGIN':
      return { ...state, data: action.data }
    case 'app/SET_ERROR':
      return { ...state, error: action.error }
    case 'app/SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}

export const setLoginAC = (data: UserParamsType[]) => ({ type: 'app/SET_LOGIN', data } as const)

export const setAppErrorAC = (error: string | null) => ({ type: 'app/SET_ERROR', error } as const)

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: 'app/SET_IS_LOGGED_IN', isLoggedIn } as const)

export type ActionsAppType =
  | ReturnType<typeof setLoginAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setIsLoggedInAC>

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(data)

      dispatch(setLoginAC(res.data))
      dispatch(setIsLoggedInAC(true))
    } catch (error: any) {
      console.log(error.response.data)
      errorUtils(error, dispatch)
    }
  }
