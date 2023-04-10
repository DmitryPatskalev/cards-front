import React from 'react'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import common from '../../../../common-css-style/common-container.module.scss'

import s from './NewCard.module.scss'

import { NewCardType } from 'api/cards-api'
import { useAppDispatch, useAppSelector } from 'app/store'
import style from 'common/auth/profile/Profile.module.scss'
import { createNewCardTC } from 'common/cards/pack/card/cards-reducer'
import leftArrow from 'common/utils/img/leftArrow.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const NewCard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { packName } = useAppSelector(state => state.cards)
  const { cardsPack_id } = useParams()

  const createNewCard = (data: NewCardType) => {
    dispatch(createNewCardTC(data))
  }

  return (
    <div className={`${common.commonContainer} ${s.newCard}`}>
      <div className={style.navigationToPack}>
        <img
          onClick={() => navigate('/cards/pack')}
          src={leftArrow}
          alt="leftArrow"
          className={style.leftArrow}
        />
        <SubTitle title="Back to Packs List" />
      </div>
      <Title title={packName} />
      <div className={s.phrase}>This is pack is empty. Click add new card to fill this pack.</div>
      <SuperButton
        onClick={() =>
          createNewCard({
            card: {
              cardsPack_id,
              question: 'What is the React',
              answer: 'It is awesome library',
            },
          })
        }
        xType={'default'}
      >
        Add new card
      </SuperButton>
    </div>
  )
}
