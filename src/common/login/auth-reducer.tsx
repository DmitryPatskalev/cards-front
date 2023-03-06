import {
  authAPI,
  forgotPasswordAPI,
  ForgotPasswordParamsType,
  LoginParamsType,
} from '../../api/cards -api'
import { setStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
  error: null as string | null,
  isLoggedIn: false,
  isDisabled: false,
  isRegistered: false,
  name: '',
  // email: null as string | null,
  // message: null as string | null,
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
    case 'auth/SET_REGISTER':
      return { ...state, isRegistered: action.isRegistered }
    case 'auth/UPDATE_USER':
      return { ...state, name: action.name }
    // case 'auth/FORGOT_PASSWORD':
    //   return { ...state, email: action.email, message: action.message }
    default:
      return state
  }
}

export const setErrorAC = (error: string | null) => ({ type: 'auth/SET_ERROR', error } as const)

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: 'auth/SET_IS_LOGGED_IN', isLoggedIn } as const)

export const setIsDisabledAC = (isDisabled: boolean) =>
  ({ type: 'auth/SET_IS_DISABLED', isDisabled } as const)

export const setRegisterAC = (isRegistered: boolean) =>
  ({ type: 'auth/SET_REGISTER', isRegistered } as const)

export const forgotPasswordAC = (email: string, message: string) =>
  ({ type: 'auth/FORGOT_PASSWORD', email, message } as const)

export const updateUserAC = (name: string) => ({ type: 'auth/UPDATE_USER', name } as const)

export type ActionsAuthType =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsDisabledAC>
  | ReturnType<typeof setRegisterAC>
  | ReturnType<typeof forgotPasswordAC>
  | ReturnType<typeof updateUserAC>

export const registerTC =
  (data: LoginParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      await authAPI.register(data)
      dispatch(setRegisterAC(true))
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
    }
  }

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      const res = await authAPI.login(data)

      dispatch(updateUserAC(res.data.name))
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

export const forgottenPasswordTC =
  (field: ForgotPasswordParamsType): AppThunk =>
  async dispatch => {
    try {
      await forgotPasswordAPI.forgot(field)
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const updateUserTC =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusAC('succeeded'))
      const res = await authAPI.update(name)

      dispatch(updateUserAC(res.data.updatedUser.name))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
