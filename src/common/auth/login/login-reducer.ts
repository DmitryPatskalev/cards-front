import { authAPI, ForgotPasswordType, LoginType } from 'api/auth-api'
import { initializedAppTC } from 'app/app-reducer'
import { AppThunk } from 'app/store'
import { setIsLoading } from 'common/cards/pack/packs-reducer'
import { PropertiesType } from 'common/utils/ActionsTypeUtils'
import { errorUtils } from 'common/utils/errors/error/error-utils'

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
  _id: '',
}

type InitialStateType = typeof initialState

export const loginReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
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
    case 'auth/SET_USER_ID':
      return { ...state, _id: action._id }
    default:
      return state
  }
}
export const loginActions = {
  setError: (error: string | null) => ({ type: 'auth/SET_ERROR', error } as const),

  setIsLoggedIn: (isLoggedIn: boolean) => ({ type: 'auth/SET_IS_LOGGED_IN', isLoggedIn } as const),

  setIsDisabled: (isDisabled: boolean) => ({ type: 'auth/SET_IS_DISABLED', isDisabled } as const),

  setRegister: (isRegistered: boolean) => ({ type: 'auth/SET_REGISTER', isRegistered } as const),

  recoveryPassword: (email: string, message: string) =>
    ({ type: 'auth/RECOVERY_PASSWORD', email, message } as const),

  updateUserName: (name: string) => ({ type: 'auth/UPDATE_USER_NAME', name } as const),

  setUserEmail: (email: string) => ({ type: 'auth/SET_USER_EMAIL', email } as const),

  setIsSuccess: (isSuccess: boolean) => ({ type: 'auth/IS_SUCCESS', isSuccess } as const),

  setNewPassword: (password: string, resetPasswordToken: string) =>
    ({ type: 'auth/SET_NEW_PASSWORD', password, resetPasswordToken } as const),

  setUserId: (_id: string) => ({ type: 'auth/SET_USER_ID', _id } as const),
}

export const registerTC =
  (data: LoginType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabled(true))
      await authAPI.register(data)
      dispatch(setRegister(true))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabled(false))
    }
  }

export const loginTC =
  (data: LoginType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabled(true))
      const res = await authAPI.login(data)
      const { name, email } = res.data

      dispatch(updateUserName(name))
      dispatch(setUserEmail(email))

      dispatch(initializedAppTC())
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabled(false))
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsDisabled(true))
    await authAPI.logout()
    dispatch(setIsLoggedIn(false))
  } catch (error) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setIsDisabled(false))
  }
}

export const recoveryPasswordTC =
  (data: ForgotPasswordType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabled(true))
      const res = await authAPI.recovery(data)
      const { email, message } = res.data

      if (res.data.success) {
        dispatch(setIsSuccess(true))
        dispatch(recoveryPassword(email, message))
        dispatch(setUserEmail(data.email))
      } else {
        setError(res.data.error)
      }
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabled(false))
    }
  }

export const updateUserTC =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsLoading(true))
      const res = await authAPI.updateUserName(name)

      dispatch(updateUserName(res.data.updatedUser.name))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabled(true))
      const res = await authAPI.newPassword(password, resetPasswordToken)

      if (res.data.info) {
        dispatch(setNewPassword(password, resetPasswordToken))
        dispatch(setIsSuccess(true))
      }
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabled(false))
    }
  }

export type AuthActionsType = ReturnType<PropertiesType<typeof loginActions>>
export const {
  recoveryPassword,
  setNewPassword,
  setIsDisabled,
  setIsSuccess,
  setIsLoggedIn,
  setRegister,
  setUserId,
  updateUserName,
  setUserEmail,
  setError,
} = loginActions
