import React from 'react'

import style from '../common-style/common-container.module.scss'
import { ErrorSnackBar } from '../error-snack-bar/ErrorSnackBar'

import s from './Login.module.scss'
import { SignForm } from './LoginForm'

export const Login = () => {
  return (
    <div className={`${style.commonContainer} ${s.loginContainer}`}>
      <div className={s.formContainer}>
        <SignForm title="Sing In" />
      </div>
      <ErrorSnackBar />
    </div>
  )
}

//email: "nya-admin@nya.nya"
// password: "1qazxcvBG"
