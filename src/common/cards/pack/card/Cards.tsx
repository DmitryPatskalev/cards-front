import React, { SyntheticEvent, useEffect, useState } from 'react'

import { Rating } from '@mui/material'
import { useParams } from 'react-router-dom'

import common from '../../../common-css-style/common-container.module.scss'
import table from '../../../common-css-style/Table.module.scss'
import { SearchByQuestion } from '../handlers/search-input/SearchByQuestion'
import pack from '../Packs.module.scss'

import { fetchCardsTC, setGradeTC, updateCardTC } from './cards-reducer'
import s from './Cards.module.scss'

import { GradeCardType, UpdateCardType } from 'api/cards-api'
import { useAppDispatch, useAppSelector } from 'app/store'
import { CardsModalActions } from 'common/cards/pack/card/cards-modal-window/CardsModalActions'
import { PacksCardsPagination } from 'common/cards/pack/handlers/packs-pagination/PacksCardsPagination'
import pencil from 'common/utils/img/pencil-line-light.svg'
import remove from 'common/utils/img/remove.svg'
import { Loading } from 'common/utils/loading/Loading'
import { ImgNavigate } from 'common/utils/navigate/ImgNavigate'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'

export const Cards = () => {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { isLoading } = useAppSelector(state => state.packs)
  const { isLoggedIn, _id } = useAppSelector(state => state.auth)
  const { cards, name, pageCard, pageCardCount } = useAppSelector(state => state.cards)

  const { cardsPack_id } = useParams()

  const updateCardHandler = (data: UpdateCardType) => {
    dispatch(updateCardTC(data))
  }

  const setGradeOnChange = (event: SyntheticEvent, data: GradeCardType) => {
    dispatch(setGradeTC(data))
  }

  useEffect(() => {
    if (isLoggedIn && cardsPack_id) {
      dispatch(fetchCardsTC(cardsPack_id))
    }
  }, [pageCard, pageCardCount])

  return (
    <div className={common.commonContainer}>
      <ImgNavigate title="Back to Pack List" />
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
          <tbody>
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {cards.length ? (
              cards.map(card => {
                return (
                  <tr key={card._id}>
                    <td>{card.question}</td>
                    <td>{card.answer}</td>
                    <td>{card.updated.slice(0, 10)}</td>
                    <td>
                      <Rating
                        value={card.grade}
                        onChange={event =>
                          setGradeOnChange(event, { card_id: card._id, grade: card.grade })
                        }
                      />
                    </td>
                    <td className={table.actionsBlock}>
                      <CardsModalActions card={card} />
                      <button
                        disabled={card.user_id !== _id}
                        onClick={() =>
                          updateCardHandler({
                            card: {
                              _id: '6435accee26fcaa528bf1717',
                              question: 'new question',
                              answer: 'new answer',
                            },
                          })
                        }
                      >
                        <img src={pencil} alt="pencil" />
                      </button>
                      <button disabled={card.user_id !== _id}>
                        <img src={remove} alt="remove" />
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr className={table.emptyPacks}>
                <td>
                  <Title title="Cards don't exist. Please create new card." />
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  )
}
