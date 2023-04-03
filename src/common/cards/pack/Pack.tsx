import React from 'react'

import common from '../../common-style/common-container.module.scss'
import { SuperButton } from '../../superComponents/superButton/SuperButton'
import { Title } from '../../utils/Title/Title'

import { Handlers } from './handlers/Handlers'
import s from './Pack.module.scss'
import { createNewPacksTC } from './packs-reducer'
import { Table } from './table/Table'

import { NewPackType } from 'api/typesAPI'
import { useAppDispatch } from 'app/store'

export const Pack = () => {
  const dispatch = useAppDispatch()

  const createNewCards = (data: NewPackType) => {
    dispatch(createNewPacksTC(data))
  }

  return (
    <div className={`${common.commonContainer}`}>
      <div className={s.navBlock}>
        <Title title="Pack List" />
        <SuperButton
          onClick={() => createNewCards({ cardsPack: { name: 'Batman' } })}
          className={s.button}
          xType="default"
        >
          Add new Pack
        </SuperButton>
      </div>
      <Handlers />
      <Table />
    </div>
  )
}
