import { authAPI, LoginParamsType } from '../../api/cards -api'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
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

export const setErrorAC = (error: string | null) => ({ type: 'auth/SET_ERROR', error } as const)

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: 'auth/SET_IS_LOGGED_IN', isLoggedIn } as const)

export const setIsDisabledAC = (isDisabled: boolean) =>
  ({ type: 'auth/SET_IS_DISABLED', isDisabled } as const)

export type ActionsAuthType =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsDisabledAC>

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      await authAPI.login(data)
      dispatch(setIsLoggedInAC(true))
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsDisabledAC(true))
    await authAPI.logout()

    dispatch(setIsLoggedInAC(false))
  } catch (error: any) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setIsDisabledAC(false))
  }
}
