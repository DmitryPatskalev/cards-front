import React, { useState } from 'react'

import common from '../../common-css-style/common-container.module.scss'
import close from '../../utils/img/close.svg'
import { Title } from '../../utils/Title/Title'

import { Handlers } from './handlers/Handlers'
import { createNewPacksTC } from './packs-reducer'

import { NewPackType } from 'api/packs-api'
import { useAppDispatch, useAppSelector } from 'app/store'
import { ModalWindow } from 'common/cards/pack/handlers/modal-window/ModalWindow'
import s from 'common/cards/pack/Packs.module.scss'
import { PacksTable } from 'common/cards/pack/table/PacksTable'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Packs = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const { isDisabled } = useAppSelector(state => state.auth)
  const { isMyPacks } = useAppSelector(state => state.packs)

  const createNewCards = (data: NewPackType) => {
    dispatch(createNewPacksTC(data))
  }

  return (
    <div className={common.commonContainer}>
      <div className={s.navBlock}>
        <Title title={isMyPacks ? 'My Packs List' : 'All Packs List'} />

        <ModalWindow width={400} height={300} open={open} setOpen={setOpen}>
          <div className={s.titleModal}>
            <Title title="Add new pack" />

            <img src={close} alt="close" />
          </div>
        </ModalWindow>

        <SuperButton onClick={() => setOpen(true)} xType={isDisabled ? 'disabled' : 'default'}>
          Add new Packs
        </SuperButton>
      </div>

      <Handlers />
      <PacksTable />
    </div>
  )
}
