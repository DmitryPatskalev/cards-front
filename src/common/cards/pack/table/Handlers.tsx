import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { SuperButton } from '../../../superComponents/superButton/SuperButton'
import { SuperInput } from '../../../superComponents/superInput/SuperInput'
import { SubTitle } from '../../../utils/SubTitle/SubTitle'
import { getAllPackTC, getMyPacksTC } from '../../packs-reducer'

import clearFilter from './../../../utils/img/clear-filter.svg'
import s from './Handler.module.scss'

export const Handlers = () => {
  const [active, setActive] = useState<boolean>(false)
  const { isLoggedIn } = useAppSelector(state => state.auth)

  const { page, pageCount } = useAppSelector(state => state.packs)
  const dispatch = useAppDispatch()

  const switchMyButtonHandler = () => {
    if (isLoggedIn) {
      dispatch(getMyPacksTC())
    }
    setActive(true)
  }
  const switchAllButtonHandler = () => {
    if (isLoggedIn) {
      dispatch(getAllPackTC())
    }
    setActive(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllPackTC())
    }
  }, [page, pageCount])

  return (
    <div className={s.handlersContainer}>
      <div className={s.searchBlock}>
        <SubTitle title="Search" />
        <SuperInput className={s.searchInput} type="text" placeholder="Provide your text" />
      </div>
      <div className={s.buttonBlock}>
        <SubTitle title="Show packs cards" />
        <div className={s.buttons}>
          <SuperButton
            onClick={switchMyButtonHandler}
            className={s.switch}
            xType={active ? 'default' : 'secondary'}
          >
            My
          </SuperButton>
          <SuperButton
            onClick={switchAllButtonHandler}
            className={s.switch}
            xType={active ? 'secondary' : 'default'}
          >
            All
          </SuperButton>
        </div>
      </div>
      <div className={s.rangeBlock}>
        <SubTitle title="Number of cards" />
        <div className={s.range}>
          <div className={s.rangeCount}>1</div>
          <div className={s.rangeLine}>------------</div>
          <div className={s.rangeCount}>30</div>
        </div>
      </div>
      <div className={s.filterClearBlock}>
        <div className={s.filterClear}>
          <img className={s.imageFilter} src={clearFilter} alt={'edit'} />
        </div>
      </div>
    </div>
  )
}
