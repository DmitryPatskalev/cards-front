import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import style from '../common-style/common-container.module.scss'

import s from './Login.module.scss'
import { SignForm } from './LoginForm'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={`${style.commonContainer} ${s.loginContainer}`}>
      <div className={s.formContainer}>
        <SignForm
          titleForm="Sing In"
          titleButton="Sign In"
          titleLink="Sign Up"
          titleQuestion="Have not you an account yet?"
        />
      </div>
    </div>
  )
}

//email: "nya-admin@nya.nya"
// password: "1qazxcvBG"
