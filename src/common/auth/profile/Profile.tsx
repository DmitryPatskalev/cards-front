import React, { ChangeEvent, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { logoutTC, updateUserTC } from 'common/auth/login/login-reducer'
import style from 'common/auth/login/Login.module.scss'
import s from 'common/auth/profile/Profile.module.scss'
import commonStyle from 'common/common-css-style/common-container.module.scss'
import logout from 'common/utils/img/logout.svg'
import avatar from 'common/utils/img/Loki.jpeg'
import pencil from 'common/utils/img/pencil-line-light.svg'
import { Loading } from 'common/utils/loading/Loading'
import { ImgNavigate } from 'common/utils/navigate/ImgNavigate'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperInput } from 'components/super-components/input/SuperInput'

export const Profile = () => {
  const { isLoggedIn, isDisabled, name, email } = useAppSelector(state => state.auth)
  const { isLoading } = useAppSelector(state => state.packs)

  const [newName, setNewName] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const onClickLogoutHandler = () => {
    dispatch(logoutTC())
  }

  const activateEditMode = () => {
    setNewName(name)
    setEdit(true)
  }
  const activateViewMode = () => {
    dispatch(updateUserTC(newName))
    setEdit(false)
  }
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={`${commonStyle.commonContainer} ${style.loginContainer}`}>
      <ImgNavigate title="Go to Pack List" />
      <div className={style.formContainer}>
        <div className={style.form}>
          <h2 className={style.titleForm}>Personal Information</h2>

          <div className={s.imgBlock}>
            <img className={s.avatar} src={avatar} alt="avatar" />
          </div>
          <span className={s.nickName}>Nickname</span>
          <div className={s.nameUserBlock}>
            {isLoading ? (
              <div className={s.loading}>
                <Loading size={20} />
              </div>
            ) : (
              <>
                {edit ? (
                  <>
                    <SuperInput
                      error={!newName}
                      className={s.editableInput}
                      value={newName}
                      onChange={onChangeNameHandler}
                      autoFocus
                      type="text"
                    />
                    <SuperButton
                      onClick={activateViewMode}
                      className={s.editableButton}
                      xType={'default'}
                    >
                      SAVE
                    </SuperButton>
                  </>
                ) : (
                  <>
                    <span>{name}</span>
                    <img onClick={activateEditMode} className={s.pencil} src={pencil} alt="pen" />
                  </>
                )}
              </>
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
