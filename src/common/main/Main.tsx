import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import { initializedAppTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import Error from '../404/Error404'
import { ErrorSnackBar } from '../error-snack-bar/ErrorSnackBar'
import { Login } from '../login/Login'
import { NewPassword } from '../new-password/NewPassword'
import { PasswordRecovery } from '../password-recovery/PasswordRecovery'
import { Profile } from '../profile/Profile'
import { Register } from '../register/Register'
import { Stand } from '../superComponents/Stand'
import spinner from '../utils/img/spinner.svg'

import s from './Main.module.scss'

export const Main = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.app)

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

  if (status === 'loading') {
    return (
      <div className={s.spinnerBlock}>
        <img className={s.spinner} src={spinner} alt="spinner" />
      </div>
    )
  }

  return (
    <div className={s.main}>
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'register'} element={<Register />} />
        <Route path={'profile'} element={<Profile />} />
        <Route path={'*'} element={<Error />} />
        <Route path={'password-recovery'} element={<PasswordRecovery />} />
        <Route path={'new-password'} element={<NewPassword />} />
        <Route path={'stand'} element={<Stand />} />
      </Routes>
      <ErrorSnackBar />
    </div>
  )
}
