import React, { useEffect } from 'react'

import { Route, Routes, useParams } from 'react-router-dom'

import { initializedAppTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'
import Error from '../404/Error404'
import { Cards } from '../cards/Cards'
import { ErrorSnackBar } from '../error-snack-bar/ErrorSnackBar'
import { Login } from '../login/Login'
import { NewPassword } from '../new-password/NewPassword'
import { CheckEmail } from '../password-recovery/CheckEmail'
import { PasswordRecovery } from '../password-recovery/PasswordRecovery'
import { Profile } from '../profile/Profile'
import { Register } from '../register/Register'
import { Stand } from '../superComponents/Stand'
import spinner from '../utils/img/spinner.svg'

import s from './Main.module.scss'

export const Main = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.app)

  const { token } = useParams()

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
  console.log(token)

  return (
    <div className={s.main}>
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'register'} element={<Register />} />
        <Route path={'profile'} element={<Profile />} />
        <Route path={'*'} element={<Error />} />
        <Route path={'password-recovery'} element={<PasswordRecovery />} />
        <Route path={'check-email'} element={<CheckEmail />} />
        <Route path={`set-new-password/:${token}`} element={<NewPassword />} />
        <Route path={'stand'} element={<Stand />} />
        <Route path={'cards/pack'} element={<Cards />} />
      </Routes>
      <ErrorSnackBar />
    </div>
  )
}
