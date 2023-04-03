import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { Route, Routes, useParams } from 'react-router-dom'

import { Login } from '../auth/login/Login'
import { NewPassword } from '../auth/new-password/NewPassword'
import { CheckEmail } from '../auth/password-recovery/CheckEmail'
import { PasswordRecovery } from '../auth/password-recovery/PasswordRecovery'
import { Profile } from '../auth/profile/Profile'
import { Register } from '../auth/register/Register'
import { Card } from '../cards/pack/card/Card'
import Error from '../utils/errors/404/Error404'
import { ErrorSnackBar } from '../utils/errors/error-snack-bar/ErrorSnackBar'

import { initializedAppTC } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Packs } from 'common/cards/pack/Packs'
import s from 'common/routes/MainRoutes.module.scss'
import { Stand } from 'components/stand/Stand'

export const MainRoutes = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.app)

  const { token } = useParams()

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

  if (status === 'loading') {
    return (
      <div className={s.spinnerBlock}>
        <CircularProgress size={100} />
      </div>
    )
  }

  return (
    <div className={s.main}>
      <Routes>
        <Route path={'/'} element={<Profile />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/*'} element={<Error />} />
        <Route path={'/password-recovery'} element={<PasswordRecovery />} />
        <Route path={'/check-email'} element={<CheckEmail />} />
        <Route path={`/set-new-password/:${token}`} element={<NewPassword />} />
        <Route path={'/stand'} element={<Stand />} />

        <Route path={'/cards/pack'} element={<Packs />} />
        <Route path={'/cards/card'} element={<Card />} />
      </Routes>
      <ErrorSnackBar />
    </div>
  )
}
