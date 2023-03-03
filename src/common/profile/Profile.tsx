import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { fetchDataUserTC } from '../login/auth-reducer'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(fetchDataUserTC())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'login'} />
  }

  return <div>Profile</div>
}
