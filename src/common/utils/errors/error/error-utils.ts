import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setErrorAC } from 'common/auth/login/login-reducer'

export const errorUtils = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setErrorAC(error))
  } else {
    dispatch(setErrorAC(`Native error ${err.message}`))
  }
}
