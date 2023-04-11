import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'app/store'
import style from 'common/common-css-style/common-container.module.scss'
import logo from 'common/utils/img/logo-incubator.svg'
import loki from 'common/utils/img/Loki.jpeg'
import s from 'components/navbar/Navbar.module.scss'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Navbar = () => {
  const navigate = useNavigate()
  const { isLoggedIn, name } = useAppSelector(state => state.auth)

  return (
    <div className={s.navbarContainer}>
      <div className={`${style.commonContainer} ${s.navbarBlock}`}>
        <img src={logo} alt="logo" />
        {!isLoggedIn ? (
          <SuperButton
            onClick={() => navigate('/login')}
            xType={isLoggedIn ? 'disabled' : 'default'}
            className={s.button}
            disabled={isLoggedIn}
          >
            Sign in
          </SuperButton>
        ) : (
          <div className={s.avatarBlock}>
            <span onClick={() => navigate('/')} className={s.username}>
              {name}
            </span>
            <img className={s.avatar} src={loki} alt="loki" />
          </div>
        )}
      </div>
    </div>
  )
}
