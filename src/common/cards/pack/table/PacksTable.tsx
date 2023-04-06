import React from 'react'

import { CircularProgress } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'
import { deletePackTC, setSortPacksAC, updatePackTC } from '../packs-reducer'

import { UpdatedPackType } from 'api/typesAPI'
import { useAppDispatch, useAppSelector } from 'app/store'
import s from 'common/common-css-style/Table.module.scss'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { SuperSort } from 'components/super-components/sort/SuperSort'

export const PacksTable = () => {
  const { packs, isLoading, sortPacks } = useAppSelector(state => state.packs)
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()

  const onChangeSort = (newSort: string) => {
    dispatch(setSortPacksAC(newSort))

    const querySort = newSort !== '' ? { sortPacks: newSort } : {}
    const { sortPacks, ...lastQueries } = Object.fromEntries(searchParams)

    const allQuery: any = { ...lastQueries, ...querySort }

    setSearchParams(allQuery)
  }

  const dispatch = useAppDispatch()

  const updatePackHandler = (data: UpdatedPackType) => {
    dispatch(updatePackTC(data))
  }

  const deletePackHandler = () => {
    dispatch(deletePackTC())
  }

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>
            <SubTitle title="Name" />
            <SuperSort sort={sortPacks} value="name" onChange={onChangeSort} />
          </th>
          <th>
            <SubTitle title="Cards" />
            <SuperSort sort={sortPacks} value="cardsCount" onChange={onChangeSort} />
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
      {isLoading ? (
        <div className={s.circularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <tbody>
          {packs.length ? (
            packs.map(p => {
              return (
                <tr key={p._id}>
                  <td>{p.name.slice(0, 30)}</td>
                  <td>{p.cardsCount}</td>
                  <td>{p.updated.slice(0, 10)}</td>
                  <td>{p.user_name}</td>

                  <td className={s.actionsBlock}>
                    {p.user_id === '6352ce8810be8e0004d5b4f4' ? (
                      <>
                        <button onClick={() => navigate('/cards/card')} disabled={!p.cardsCount}>
                          <img src={learn} alt="learn" />
                        </button>
                        <button
                          onClick={() =>
                            updatePackHandler({
                              cardsPack: {
                                _id: '642a7ef4761a7a9b7c06e74c',
                                name: 'Updated',
                              },
                            })
                          }
                        >
                          <img src={pencil} alt="pencil" />
                        </button>
                        <button onClick={deletePackHandler}>
                          <img src={remove} alt="remove" />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => navigate('/cards/card')} disabled={!p.cardsCount}>
                        <img src={learn} alt="learn" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })
          ) : (
            <h2 className={s.emptyPacks}>Packs not found. Try to change your search parameters</h2>
          )}
        </tbody>
      )}
    </table>
  )
}
