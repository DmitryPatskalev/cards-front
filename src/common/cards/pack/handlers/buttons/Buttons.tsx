import React from 'react'

import { useAppDispatch, useAppSelector } from 'app/store'
import s from 'common/cards/pack/handlers/Handler.module.scss'
import { setIsMyPacks } from 'common/cards/pack/packs-reducer'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Buttons = () => {
  const { isMyPacks } = useAppSelector(state => state.packs)
  const dispatch = useAppDispatch()

  const getMyPacksHandler = () => {
    dispatch(setIsMyPacks(true))
  }

  const getAllPacksHandler = () => {
    dispatch(setIsMyPacks(false))
  }

  return (
    <div className={s.buttonBlock}>
      <SubTitle title="Show packs cards" />
      <div className={s.buttons}>
        <SuperButton
          onClick={getMyPacksHandler}
          className={s.switch}
          xType={isMyPacks ? 'default' : 'secondary'}
        >
          My
        </SuperButton>

        <SuperButton
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
