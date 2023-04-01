import React from 'react'

import { useNavigate } from 'react-router-dom'

import commonStyle from '../common-style/common-container.module.scss'
import style from '../login/Login.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import emailIcon from '../utils/img/email.svg'

import s from './PasswordRecovery.module.scss'

import { useAppSelector } from 'app/store'

export const CheckEmail = () => {
  const navigate = useNavigate()

  const { email } = useAppSelector(state => state.auth)

  const onClickNavigate = (route: string) => navigate(route)

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <div className={style.form}>
          <h2 className={style.titleForm}>Check Email</h2>
          <div className={s.emailIconBlock}>
            <img src={emailIcon} alt="email" />
          </div>
          <div className={s.emailInstruction}>
            We have sent an Email with instructions to <b>{email}</b>
          </div>
          <SuperButton onClick={() => onClickNavigate('/login')} xType={'default'}>
            Back to login
          </SuperButton>
        </div>
      </div>
    </div>
  )
}
