import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'app/store'
import style from 'common/auth/login/Login.module.scss'
import s from 'common/auth/password-recovery/PasswordRecovery.module.scss'
import commonStyle from 'common/common-css-style/common-container.module.scss'
import emailIcon from 'common/utils/img/email.svg'
import { SuperButton } from 'components/super-components/button/SuperButton'

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
