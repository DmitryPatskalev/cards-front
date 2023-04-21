import { AppThunk } from './store'

import { authAPI } from 'api/auth-api'
import {
  setIsLoggedIn,
  setUserEmail,
  setUserId,
  updateUserName,
} from 'common/auth/login/login-reducer'
import { PropertiesType } from 'common/utils/ActionsTypeUtils'
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
  action: AppActionsType
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

const appActions = {
  setStatus: (status: RequestStatusType) => ({ type: 'app/SET_STATUS', status } as const),

  setIsInitialized: (isInitialized: boolean) =>
    ({ type: 'app/SET_IS_INITIALIZED', isInitialized } as const),
}

//thunks
export const initializedAppTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatus('loading'))
    const res = await authAPI.me()
    const { name, email, _id } = res.data

    dispatch(setStatus('succeeded'))

    dispatch(setUserId(_id))
    dispatch(updateUserName(name))
    dispatch(setUserEmail(email))
    dispatch(setIsLoggedIn(true))
    dispatch(setIsInitialized(true))
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setStatus('failed'))
  }
}

export type AppActionsType = ReturnType<PropertiesType<typeof appActions>>
export const { setStatus, setIsInitialized } = appActions
