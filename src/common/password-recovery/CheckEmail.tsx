import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import commonStyle from '../common-style/common-container.module.scss'
import style from '../login/Login.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import emailIcon from '../utils/img/email.svg'

import s from './PasswordRecovery.module.scss'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const { isSuccess, message, email } = useAppSelector(state => state.auth)

  const onClickNavigate = (route: string) => navigate(route)

  console.log(email, isSuccess, message)

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <div className={style.form}>
          <h2 className={style.titleForm}>Check Email</h2>
          <div className={s.emailIconBlock}>
            <img src={emailIcon} alt="email" />
          </div>
          <div className={s.emailInstruction}>
            We have sent an Email with instructions to {email}
          </div>
          <SuperButton onClick={() => onClickNavigate('/login')} xType={'default'}>
            Back to login
          </SuperButton>
        </div>
      </div>
    </div>
  )
}
