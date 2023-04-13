import React, { ChangeEvent, useState } from 'react'

import common from '../../common-css-style/common-container.module.scss'
import { Title } from '../../utils/Title/Title'

import { Handlers } from './handlers/Handlers'

import { NewPackType } from 'api/packs-api'
import { useAppDispatch, useAppSelector } from 'app/store'
import { ModalWindow } from 'common/cards/pack/handlers/modal-window/ModalWindow'
import { createNewPacksTC } from 'common/cards/pack/packs-reducer'
import s from 'common/cards/pack/Packs.module.scss'
import { PacksTable } from 'common/cards/pack/table/PacksTable'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Packs = () => {
  const [open, setOpen] = useState(false)
  const [packName, setPackName] = useState('')

  const dispatch = useAppDispatch()

  const addNewPack = (data: NewPackType) => {
    closeModalWindow()
    dispatch(createNewPacksTC(data))
  }

  const onChangeNewPack = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }

  const { isMyPacks } = useAppSelector(state => state.packs)

  const closeModalWindow = () => setOpen(false)

  return (
    <div className={common.commonContainer}>
      <div className={s.navBlock}>
        <Title title={isMyPacks ? 'My Packs List' : 'All Packs List'} />
        <SuperButton onClick={() => setOpen(true)} xType={'default'}>
          Add new Packs
        </SuperButton>
      </div>
      <Handlers />
      <PacksTable />

      <ModalWindow
        packName={packName}
        onChangeNewPack={onChangeNewPack}
        addNewPack={addNewPack}
        title="Add new pack"
        open={open}
        backgroundOnClick={closeModalWindow}
      />
    </div>
  )
}
