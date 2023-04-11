import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import s from 'common/cards/pack/handlers/Handler.module.scss'
import { fetchPacksTC, setIsMyPacksAC } from 'common/cards/pack/packs-reducer'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Buttons = () => {
  const { isMyPacks } = useAppSelector(state => state.packs)
  const { isDisabled } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const getMyPacksHandler = () => {
    dispatch(setIsMyPacksAC(true))
  }

  const getAllPacksHandler = () => {
    dispatch(setIsMyPacksAC(false))
  }

  return (
    <div className={s.buttonBlock}>
      <SubTitle title="Show packs cards" />
      <div className={s.buttons}>
        <SuperButton
          disabled={isDisabled}
          onClick={getMyPacksHandler}
          className={s.switch}
          xType={isMyPacks ? 'default' : 'secondary'}
        >
          My
        </SuperButton>

        <SuperButton
          disabled={isDisabled}
          onClick={getAllPacksHandler}
          className={s.switch}
          xType={isMyPacks ? 'secondary' : 'default'}
        >
          All
        </SuperButton>
      </div>
    </div>
  )
}
