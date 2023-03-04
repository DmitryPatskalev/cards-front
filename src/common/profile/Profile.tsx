import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { logoutTC } from '../login/auth-reducer'

export const Profile = () => {
  const { isLoggedIn, isDisabled } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const onClickLogoutHandler = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={'login'} />
  }

  return (
    <div>
      Profile
      <button disabled={isDisabled} onClick={onClickLogoutHandler}>
        LogOut
      </button>
    </div>
  )
}
