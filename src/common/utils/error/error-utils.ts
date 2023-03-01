import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ActionsAuthType, setErrorAC } from '../../login/auth-reducer'

export const errorUtils = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch<ActionsAuthType>
) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setErrorAC(error))
  } else {
    dispatch(setErrorAC(`Native error ${err.message}`))
  }
}
