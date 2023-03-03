import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'

export const Profile = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'login'} />
  }

  return <div>Profile</div>
}
