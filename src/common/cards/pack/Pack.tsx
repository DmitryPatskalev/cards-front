import React from 'react'

import { NewCardsType } from '../../../api/typesAPI'
import { useAppDispatch } from '../../../app/store'
import common from '../../common-style/common-container.module.scss'
import { SuperButton } from '../../superComponents/superButton/SuperButton'
import { Title } from '../../utils/Title/Title'
import { createNewCardTC } from '../cardsReducer'

import s from './Pack.module.scss'
import { Handlers } from './table/Handlers'
import { Table } from './table/Table'

export const Pack = () => {
  const dispatch = useAppDispatch()

  const createNewCards = (data: NewCardsType) => {
    dispatch(createNewCardTC(data))
  }

  return (
    <div className={`${common.commonContainer}`}>
      <div className={s.navBlock}>
        <Title title="Pack List" />
        <SuperButton className={s.button} xType="default">
          Add new Pack
        </SuperButton>
      </div>
      <Handlers />
      <Table />
    </div>
  )
}
