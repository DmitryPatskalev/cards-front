import React from 'react'

import { Rating } from '@mui/material'

import table from '../../../common-css-style/Table.module.scss'

import s from './Cards.module.scss'

import { useAppSelector } from 'app/store'
import { CardsModalActions } from 'common/cards/pack/card/cards-modal-window/CardsModalActions'
import { Loading } from 'common/utils/loading/Loading'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'

export const CardsTable = () => {
  const { isLoading } = useAppSelector(state => state.packs)

  const { cards } = useAppSelector(state => state.cards)

  return (
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
                    <Rating />
                  </td>
                  <td className={table.actionsBlock}>
                    <CardsModalActions card={card} />
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
  )
}
