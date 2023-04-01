import React from 'react'

import s from './App.module.scss'

import { Main } from 'common/main/Main'
import { NavBarComponent } from 'common/navbar/NavBarComponent'

function App() {
  return (
    <div className={s.app}>
      <NavBarComponent />
      <Main />
    </div>
  )
}

export default App
