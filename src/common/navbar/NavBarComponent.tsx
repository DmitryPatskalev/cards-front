import React from 'react'

import style from '../common-style/common-container.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'

import logo from './../utils/img/logo-incubator.svg'
import s from './NavBar.module.scss'

export const NavBarComponent = () => {
  return (
    <div className={s.navbarContainer}>
      <div className={`${style.commonContainer} ${s.navbarBlock}`}>
        <img src={logo} alt="logo" />
        <SuperButton xType="default" className={s.button}>
          Sign in
        </SuperButton>
      </div>

      {/*<TestComponent />*/}
    </div>
  )
}
