import React from 'react'

import { NavLink } from 'react-router-dom'

export const TestComponent = () => {
  return (
    <>
      <NavLink to={'login'}>Login</NavLink>
      <NavLink to={'register'}>Registration</NavLink>
      <NavLink to={'profile'}>Profile</NavLink>
      <NavLink to={'*'}>404</NavLink>
      <NavLink to={'password-recovery'}>Password recovery</NavLink>
      <NavLink to={'new-password'}>New Password</NavLink>
      <NavLink to={'stand'}>Stand</NavLink>
    </>
  )
}

export default TestComponent
