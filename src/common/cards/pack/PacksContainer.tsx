import React, { useState } from 'react'

import common from '../../common-css-style/common-container.module.scss'
import { Title } from '../../utils/Title/Title'

import { Handlers } from './handlers/Handlers'

import { useAppSelector } from 'app/store'
import { AddPackModal } from 'common/cards/pack/handlers/modal-window/AddPackModal'
import s from 'common/cards/pack/Packs.module.scss'
import { PacksTable } from 'common/cards/pack/table/PacksTable'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const PacksContainer = () => {
  const [open, setOpen] = useState(false)

  const { isMyPacks } = useAppSelector(state => state.packs)

  return (
    <div className={common.commonContainer}>
      <div className={s.navBlock}>
        <Title title={isMyPacks ? 'My PacksContainer List' : 'All PacksContainer List'} />
        <SuperButton onClick={() => setOpen(true)} xType={'default'}>
          Add new Packs
        </SuperButton>
      </div>
      <Handlers />
      <PacksTable />
      <AddPackModal title="Add new pack" open={open} setOpen={setOpen}></AddPackModal>
    </div>
  )
}
