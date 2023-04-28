import React from 'react'

import { useParams } from 'react-router-dom'

import { useAppSelector } from 'app/store'
import s from 'common/cards/pack/table/LearnPack.module.scss'
import common from 'common/common-css-style/common-container.module.scss'
import { ImgNavigate } from 'common/utils/navigate/ImgNavigate'
import { Title } from 'common/utils/Title/Title'

export const LearnCards = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const packs = useAppSelector(state => state.packs.cardPacks)

  const { _id } = useParams()

  const packName = packs
    .filter(p => p._id === _id)
    .map(p => p.name)
    .join('')

  return (
    <div className={common.commonContainer}>
      <ImgNavigate title="Back to Pack List" />
      <div className={s.learnPackContainer}>
        <Title title={`Learn "${packName}"`} />
        <div className={s.learnPackBlock}>
          <div>
            <Title title={`Question ""`} />
          </div>
        </div>
      </div>
    </div>
  )
}
