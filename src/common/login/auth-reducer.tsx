import { authAPI, LoginParamsType, UserParamsType } from '../../api/cards -api'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
  data: [] as UserParamsType[],
  error: null as string | null,
  isLoggedIn: false,
  isDisabled: false,
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsAuthType
): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_LOGIN':
      return { ...state, data: action.data }
    case 'auth/SET_ERROR':
      return { ...state, error: action.error }
    case 'auth/SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    case 'auth/SET_IS_DISABLED':
      return { ...state, isDisabled: action.isDisabled }
    default:
      return state
  }
}

export const setLoginAC = (data: UserParamsType[]) => ({ type: 'auth/SET_LOGIN', data } as const)

export const setErrorAC = (error: string | null) => ({ type: 'auth/SET_ERROR', error } as const)

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: 'auth/SET_IS_LOGGED_IN', isLoggedIn } as const)

export const setIsDisabledAC = (isDisabled: boolean) =>
  ({ type: 'auth/SET_IS_DISABLED', isDisabled } as const)

export type ActionsAuthType =
  | ReturnType<typeof setLoginAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsDisabledAC>

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      const res = await authAPI.login(data)

      dispatch(setLoginAC(res.data))
      dispatch(setIsLoggedInAC(true))
    } catch (error: any) {
      console.log(error.response.data)
      dispatch(setIsDisabledAC(false))
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
    }
  }
