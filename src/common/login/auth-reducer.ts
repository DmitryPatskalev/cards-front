import { authAPI } from '../../api/cards -api'
import { ForgotPasswordType, LoginType } from '../../api/typesAPI'
import { setStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
  error: null as string | null,
  isLoggedIn: false,
  isDisabled: false,
  isRegistered: false,
  isSuccess: false,
  name: '',
  email: '',
  message: '',
  password: '',
  resetPasswordToken: '',
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
    case 'auth/UPDATE_USER_NAME':
      return { ...state, name: action.name }
    case 'auth/SET_USER_EMAIL':
      return { ...state, email: action.email }
    case 'auth/RECOVERY_PASSWORD':
      return { ...state, email: action.email, message: action.message }
    case 'auth/IS_SUCCESS':
      return { ...state, isSuccess: action.isSuccess }
    case 'auth/SET_NEW_PASSWORD':
      return { ...state, password: action.password, resetPasswordToken: action.resetPasswordToken }

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

export const recoveryPasswordAC = (email: string, message: string) =>
  ({ type: 'auth/RECOVERY_PASSWORD', email, message } as const)

export const updateUserNameAC = (name: string) => ({ type: 'auth/UPDATE_USER_NAME', name } as const)

export const setUserEmailAC = (email: string) => ({ type: 'auth/SET_USER_EMAIL', email } as const)

export const setIsSuccessAC = (isSuccess: boolean) =>
  ({ type: 'auth/IS_SUCCESS', isSuccess } as const)

export const setNewPasswordAC = (password: string, resetPasswordToken: string) =>
  ({ type: 'auth/SET_NEW_PASSWORD', password, resetPasswordToken } as const)

export const registerTC =
  (data: LoginType): AppThunk =>
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
  (data: LoginType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      const res = await authAPI.login(data)
      const { name, email } = res.data

      dispatch(updateUserNameAC(name))
      dispatch(setUserEmailAC(email))
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

export const recoveryPasswordTC =
  (data: ForgotPasswordType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      const res = await authAPI.recovery(data)
      const { email, message } = res.data

      if (res.data.success) {
        dispatch(setIsSuccessAC(true))
        dispatch(recoveryPasswordAC(email, message))
        dispatch(setUserEmailAC(data.email))
      } else {
        setErrorAC(res.data.error)
      }
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
    }
  }

export const updateUserTC =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusAC('succeeded'))
      const res = await authAPI.update(name)

      dispatch(updateUserNameAC(res.data.updatedUser.name))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      const res = await authAPI.newPassword(password, resetPasswordToken)

      if (res.data.info) {
        dispatch(setNewPasswordAC(password, resetPasswordToken))
        dispatch(setIsSuccessAC(true))
      }
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
    }
  }

export type ActionsAuthType =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsDisabledAC>
  | ReturnType<typeof setRegisterAC>
  | ReturnType<typeof recoveryPasswordAC>
  | ReturnType<typeof updateUserNameAC>
  | ReturnType<typeof setUserEmailAC>
  | ReturnType<typeof setIsSuccessAC>
  | ReturnType<typeof setNewPasswordAC>
