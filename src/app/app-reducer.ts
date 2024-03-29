import { AppThunk } from './store'

import { authAPI } from 'api/auth-api'
import {
  setIsLoggedInAC,
  setUserEmailAC,
  setUserId,
  updateUserNameAC,
} from 'common/auth/login/login-reducer'
import { errorUtils } from 'common/utils/errors/error/error-utils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialAppStateType = {
  status: RequestStatusType
  isInitialized: boolean
}

const initialAppState: InitialAppStateType = {
  status: 'idle',
  isInitialized: false,
}

export const appReducer = (
  state: InitialAppStateType = initialAppState,
  action: ActionsAppType
): InitialAppStateType => {
  switch (action.type) {
    case 'app/SET_STATUS':
      return { ...state, status: action.status }
    case 'app/SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

export const setStatusAC = (status: RequestStatusType) =>
  ({ type: 'app/SET_STATUS', status } as const)
export const setIsInitializedAC = (isInitialized: boolean) =>
  ({ type: 'app/SET_IS_INITIALIZED', isInitialized } as const)

export type ActionsAppType = ReturnType<typeof setStatusAC> | ReturnType<typeof setIsInitializedAC>

//thunks
export const initializedAppTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatusAC('loading'))
    const res = await authAPI.me()
    const { name, email, _id } = res.data

    dispatch(setStatusAC('succeeded'))

    dispatch(setUserId(_id))
    dispatch(updateUserNameAC(name))
    dispatch(setUserEmailAC(email))
    dispatch(setIsLoggedInAC(true))
    dispatch(setIsInitializedAC(true))
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setStatusAC('failed'))
  }
}
