/* eslint-disable import/no-named-as-default */
import React from 'react'

import TestComponent from '../TestComponent'

import s from './NavBar.module.scss'

export const NavBarComponent = () => {
  return (
    <div className={s.navbar}>
      <TestComponent />
    </div>
  )
}
