import React from 'react'

import common from '../../common-css-style/common-container.module.scss'
import { Title } from '../../utils/Title/Title'

import { Handlers } from './handlers/Handlers'
import { createNewPacksTC } from './packs-reducer'

import { NewPackType } from 'api/typesAPI'
import { useAppDispatch } from 'app/store'
import s from 'common/cards/pack/Packs.module.scss'
import { PacksTable } from 'common/cards/pack/table/PacksTable'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const createNewCards = (data: NewPackType) => {
    dispatch(createNewPacksTC(data))
  }

  return (
    <div className={`${common.commonContainer}`}>
      <div className={s.navBlock}>
        <Title title="Packs List" />
        <SuperButton
          onClick={() => createNewCards({ cardsPack: { name: 'Batman' } })}
          className={s.button}
          xType="default"
        >
          Add new Packs
        </SuperButton>
      </div>
      <Handlers />
      <PacksTable />
    </div>
  )
}
