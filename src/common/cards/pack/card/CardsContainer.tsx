import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { AddCardModal } from 'common/cards/pack/card/cards-modal-window/AddCardModal'
import { fetchCardsTC, setPackName } from 'common/cards/pack/card/cards-reducer'
import s from 'common/cards/pack/card/Cards.module.scss'
import { CardsTable } from 'common/cards/pack/card/CardsTable'
import { PacksCardsPagination } from 'common/cards/pack/handlers/packs-pagination/PacksCardsPagination'
import { SearchByQuestion } from 'common/cards/pack/handlers/search-input/SearchByQuestion'
import pack from 'common/cards/pack/Packs.module.scss'
import common from 'common/common-css-style/common-container.module.scss'
import { ImgNavigate } from 'common/utils/navigate/ImgNavigate'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const CardsContainer = () => {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { name, pageCard, pageCardCount } = useAppSelector(state => state.cards)

  const { cardsPack_id } = useParams()
  const navigate = useNavigate()

  const onBack = () => {
    navigate('/cards/pack')
    dispatch(setPackName(''))
  }

  useEffect(() => {
    if (isLoggedIn && cardsPack_id) {
      dispatch(fetchCardsTC(cardsPack_id))
    }
  }, [pageCard, pageCardCount])

  return (
    <div className={common.commonContainer}>
      <ImgNavigate title="Back to Pack List" onClick={onBack} />
      <div className={pack.navBlock}>
        <Title title={name} />
        <SuperButton onClick={() => setOpen(true)} xType={'default'}>
          Add new card
        </SuperButton>
      </div>

      <div className={s.searchBlock}>
        <SearchByQuestion />
      </div>
      <PacksCardsPagination />
      <CardsTable />
      <AddCardModal open={open} setOpen={setOpen} />
    </div>
  )
}
