import React from 'react'

import { UpdatedPackType } from '../../../../api/typesAPI'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'
import { SubTitle } from '../../../utils/SubTitle/SubTitle'
import { deletePackTC, setPageAC, updatePackTC } from '../../packs-reducer'

import s from './Table.module.scss'

export const Table = () => {
  const { packs, page } = useAppSelector(state => state.packs)

  const dispatch = useAppDispatch()

  const updatePackHandler = (data: UpdatedPackType) => {
    dispatch(updatePackTC(data))
  }

  const deletePackHandler = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const setPageHandler = (page: number) => {
    dispatch(setPageAC(page))
  }

  const numbers = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ]

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
        {packs.map(elem => {
          return (
            <tr key={elem._id}>
              <td>{elem.name.slice(0, 30)}</td>
              <td>{elem.cardsCount}</td>
              <td>{elem.updated.slice(0, 10)}</td>
              <td>{elem.user_name}</td>
              <td className={s.actionsBlock}>
                <img className={s.actions} src={learn} alt="learn" />
                <img
                  onClick={() =>
                    updatePackHandler({
                      cardsPack: { _id: '641c7832f24ee44dc23342c0', name: 'New pack updated' },
                    })
                  }
                  src={pencil}
                  alt="pencil"
                />
                <img src={remove} alt="remove" />
              </td>
            </tr>
          )
        })}
      </tbody>
      <div style={{ marginTop: '20px' }}>
        {numbers.map(p => {
          return (
            <button
              onClick={() => setPageHandler(p.number)}
              style={p.id === page ? { backgroundColor: 'lightblue' } : {}}
              key={p.id}
            >
              {p.number}
            </button>
          )
        })}
      </div>
    </table>
  )
}
