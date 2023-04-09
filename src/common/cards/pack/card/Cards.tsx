import React, { useEffect } from 'react'

import { CircularProgress, Rating } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import style from '../../../auth/profile/Profile.module.scss'
import common from '../../../common-css-style/common-container.module.scss'
import table from '../../../common-css-style/Table.module.scss'
import leftArrow from '../../../utils/img/leftArrow.svg'
import pack from '../Packs.module.scss'

import { createNewCardTC, deleteCardTC, fetchCardsTC, updateCardTC } from './cards-reducer'
import s from './Cards.module.scss'

import { NewCardType, UpdateCardType } from 'api/cards-api'
import { useAppDispatch, useAppSelector } from 'app/store'
import { PacksCardsPagination } from 'common/cards/pack/handlers/packs-pagination/PacksCardsPagination'
import pencil from 'common/utils/img/pencil-line-light.svg'
import remove from 'common/utils/img/remove.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperDebounceInput } from 'components/super-components/debounce/SuperDebounceInput'

export const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isLoading, isMyPacks, page, pageCount } = useAppSelector(state => state.packs)
  const { isLoggedIn, isDisabled } = useAppSelector(state => state.auth)
  const { cards } = useAppSelector(state => state.cards)

  const { cardsPack_id } = useParams()

  const userId = '6352ce8810be8e0004d5b4f4'

  const createNewCardHundler = (data: NewCardType) => {
    dispatch(createNewCardTC(data))
  }

  const removeCardHandler = () => {
    dispatch(deleteCardTC())
  }

  const updateCardHundler = (data: UpdateCardType) => {
    dispatch(updateCardTC(data))
  }

  useEffect(() => {
    if (isLoggedIn && cardsPack_id) {
      dispatch(fetchCardsTC(cardsPack_id))
    }
  }, [page, pageCount])

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
        <Title title={isMyPacks ? 'My cards' : "Friend's Pack"} />
        <SuperButton
          onClick={() =>
            createNewCardHundler({
              card: {
                cardsPack_id,
                question: 'What the hell is going on??',
                answer: 'That is Ok!!',
              },
            })
          }
          xType={isDisabled ? 'disabled' : 'default'}
          disabled={isDisabled}
        >
          Add new card
        </SuperButton>
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
      <PacksCardsPagination />
      <table className={`${table.table} ${s.table}`}>
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
            <th>
              <SubTitle title="Actions" />
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <div className={table.circularProgress}>
            <CircularProgress />
          </div>
        ) : (
          <tbody>
            {cards?.map(card => {
              return (
                <tr key={card.cardsPack_id}>
                  <td>{card.question}</td>
                  <td>{card.answer}</td>
                  <td>{card.updated.slice(0, 10)}</td>
                  <td>
                    <Rating value={card.grade} />
                  </td>
                  <td className={table.actionsBlock}>
                    <button
                      onClick={() =>
                        updateCardHundler({
                          card: {
                            _id: '6432d7c233c3ea8b4e684c90',
                            question: 'new question',
                            answer: 'new answer',
                          },
                        })
                      }
                    >
                      <img src={pencil} alt="pencil" />
                    </button>
                    <button onClick={removeCardHandler}>
                      <img src={remove} alt="remove" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
