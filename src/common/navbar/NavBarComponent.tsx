import React from 'react'

import { useNavigate } from 'react-router-dom'

import style from '../common-style/common-container.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'

import logo from './../utils/img/logo-incubator.svg'
import s from './NavBar.module.scss'

export const NavBarComponent = () => {
  const navigate = useNavigate()
  const onClickNavigate = (route: string) => navigate(route)

  return (
    <div className={s.navbarContainer}>
      <div className={`${style.commonContainer} ${s.navbarBlock}`}>
        <img src={logo} alt="logo" />
        <SuperButton onClick={() => onClickNavigate('/login')} xType="default" className={s.button}>
          Sign in
        </SuperButton>
      </div>

      {/*<TestComponent />*/}
    </div>
  )
}
