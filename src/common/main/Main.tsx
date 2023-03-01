import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import { initializedAppTC } from '../../app/app-reducer'
import { useAppDispatch } from '../../app/store'
import Error from '../404/Error404'
import { Login } from '../login/Login'
import { NewPassword } from '../new-password/NewPassword'
import { PasswordRecovery } from '../password-recovery/PasswordRecovery'
import { Profile } from '../profile/Profile'
import { Register } from '../register/Register'
import { Stand } from '../superComponents/Stand'

import s from './Main.module.scss'

export const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

  return (
    <div className={s.main}>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'register'} element={<Register />} />
        <Route path={'profile'} element={<Profile />} />
        <Route path={'*'} element={<Error />} />
        <Route path={'password-recovery'} element={<PasswordRecovery />} />
        <Route path={'new-password'} element={<NewPassword />} />
        <Route path={'stand'} element={<Stand />} />
      </Routes>
    </div>
  )
}
