import { authAPI } from '../api/cards -api'
import { setIsLoggedInAC, setUserEmailAC, updateUserNameAC } from '../common/login/auth-reducer'
import { errorUtils } from '../common/utils/error/error-utils'

import { AppThunk } from './store'

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

export const initializedAppTC = (): AppThunk => async dispatch => {
  dispatch(setStatusAC('loading'))
  try {
    const res = await authAPI.me()
    const { name, email } = res.data

    dispatch(setStatusAC('succeeded'))
    dispatch(setIsLoggedInAC(true))
    dispatch(setIsInitializedAC(true))
    dispatch(updateUserNameAC(name))
    dispatch(setUserEmailAC(email))
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setStatusAC('failed'))
  }
}
