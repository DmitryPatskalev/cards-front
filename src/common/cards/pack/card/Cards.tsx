import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import style from '../../../auth/profile/Profile.module.scss'
import common from '../../../common-css-style/common-container.module.scss'
import table from '../../../common-css-style/Table.module.scss'
import leftArrow from '../../../utils/img/leftArrow.svg'
import pack from '../Packs.module.scss'

import { fetchCardsTC } from './cards-reducer'
import s from './Cards.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperDebounceInput } from 'components/super-components/debounce/SuperDebounceInput'

export const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(state => state.packs)
  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { cards } = useAppSelector(state => state.cards)

  console.log(cards)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCardsTC())
    }
  }, [])

  return (
    <div className={common.commonContainer}>
      <div className={style.navigationToPack}>
        <img
          onClick={() => navigate('/cards/pack')}
          src={leftArrow}
          alt="leftArrow"
          className={style.leftArrow}
        />
        <SubTitle title="Back to Packs List" />
      </div>
      <div className={pack.navBlock}>
        <Title title="Friend's Pack" />
        <SuperButton xType="default">Learn to Pack</SuperButton>
      </div>

      <div className={s.searchBlock}>
        <SubTitle title="Search" />
        <SuperDebounceInput
          onChangeText={() => console.log('click')}
          onDebounceChange={() => console.log('click')}
          value={''}
          className={s.searchInputCards}
          type="text"
          placeholder="Provide your text"
        />
      </div>
      <table className={table.table}>
        <thead>
          <tr>
            <th>
              <SubTitle title="Question" />
            </th>
            <th>
              <SubTitle title="Answer" />
            </th>
            <th>
              <SubTitle title="Last Updated" />
            </th>
            <th>
              <SubTitle title="Grade" />
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <div className={table.circularProgress}>
            <CircularProgress />
          </div>
        ) : (
          <tbody>
            {cards.map(card => {
              return (
                <tr key={card._id}>
                  <td>{card.question}</td>
                  <td>{card.answer}</td>
                  <td>{card.updated}</td>
                  <td>{card.grade}</td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
