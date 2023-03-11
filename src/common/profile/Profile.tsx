import React, { ChangeEvent, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import commonStyle from '../common-style/common-container.module.scss'
import { logoutTC, updateUserTC } from '../login/auth-reducer'
import style from '../login/Login.module.scss'
import { SuperButton } from '../superComponents/superButton/SuperButton'
import { SuperInput } from '../superComponents/superInput/SuperInput'
import logout from '../utils/img/logout.svg'
import avatar from '../utils/img/Loki.jpeg'
import pencil from '../utils/img/pencil-line-light.svg'

import s from './Profile.module.scss'

export const Profile = () => {
  const { isLoggedIn, isDisabled, name, email } = useAppSelector(state => state.auth)
  const [newName, setNewName] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const onClickLogoutHandler = () => {
    dispatch(logoutTC())
  }

  const activateEditMode = () => {
    setEdit(true)
    setNewName(name)
  }
  const activateViewMode = () => {
    setEdit(false)
    dispatch(updateUserTC(newName))
  }
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <div className={style.formContainer}>
        <div className={style.form}>
          <h2 className={style.titleForm}>Personal Information</h2>

          <div className={s.imgBlock}>
            <img className={s.avatar} src={avatar} alt="avatar" />
          </div>

          <div className={s.nameUserBlock}>
            {edit ? (
              <SuperInput
                error={!newName}
                className={s.editableInput}
                value={newName}
                onChange={onChangeNameHandler}
                autoFocus
                type="text"
              />
            ) : (
              <span>{name}</span>
            )}
            {edit ? (
              <SuperButton
                onClick={activateViewMode}
                className={s.editableButton}
                xType={'default'}
              >
                SAVE
              </SuperButton>
            ) : (
              <img onClick={activateEditMode} className={s.pencil} src={pencil} alt="pen" />
            )}
          </div>

          <div className={s.email}>{email}</div>
          <div className={s.buttonLogoutBlock}>
            <SuperButton
              xType={'secondary'}
              className={s.buttonLogout}
              disabled={isDisabled}
              onClick={onClickLogoutHandler}
            >
              <img className={s.iconLogout} src={logout} alt={'logout'} />
              Log out
            </SuperButton>
          </div>
        </div>
      </div>
    </div>
  )
}
