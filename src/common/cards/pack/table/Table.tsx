import React from 'react'

import { useAppSelector } from '../../../../app/store'
import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'
import { SubTitle } from '../../../utils/SubTitle/SubTitle'

import s from './Table.module.scss'

export const Table = () => {
  const { card } = useAppSelector(state => state.cards)

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>
            <SubTitle title="Name" />
          </th>
          <th>
            <SubTitle title="Cards" />
          </th>
          <th>
            <SubTitle title="Last Updated" />
          </th>
          <th>
            <SubTitle title="Created by" />
          </th>
          <th>
            <SubTitle title="Actions" />
          </th>
        </tr>
      </thead>
      <tbody>
        {card.map(elem => {
          return (
            <tr key={elem._id}>
              <td>{elem.name.slice(0, 30)}</td>
              <td>{elem.cardsCount}</td>
              <td>{elem.updated.slice(0, 10)}</td>
              <td>{elem.user_name}</td>
              <td className={s.actionsBlock}>
                <img className={s.actions} src={learn} alt="learn" />
                <img src={pencil} alt="pencil" />
                <img src={remove} alt="remove" />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
