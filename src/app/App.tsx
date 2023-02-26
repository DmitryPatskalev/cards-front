import React from 'react'

import { Main } from '../common/main/Main'
import { NavBarComponent } from '../common/navbar/NavBarComponent'

import s from './App.module.scss'

function App() {
  return (
    <div className={s.app}>
      <NavBarComponent />
      <Main />
    </div>
  )
}

export default App
