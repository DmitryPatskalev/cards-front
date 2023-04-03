import React from 'react'

import s from './App.module.scss'

import { MainRoutes } from 'common/routes/MainRoutes'
import { Navbar } from 'components/navbar/Navbar'

function App() {
  return (
    <div className={s.app}>
      <Navbar />
      <MainRoutes />
    </div>
  )
}

export default App
