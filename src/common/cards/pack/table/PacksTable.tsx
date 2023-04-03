import React from 'react'

import { CircularProgress } from '@mui/material'

import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'
import { deletePackTC, updatePackTC } from '../packs-reducer'

import { UpdatedPackType } from 'api/typesAPI'
import { useAppDispatch, useAppSelector } from 'app/store'
import s from 'common/common-css-style/Table.module.scss'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'

export const PacksTable = () => {
  const { packs, isMyPacks, isLoading } = useAppSelector(state => state.packs)

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
      {isLoading ? (
        <div className={s.circularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <tbody>
          {packs.length ? (
            packs.map(elem => {
              return (
                <tr key={elem._id}>
                  <td>{elem.name.slice(0, 30)}</td>
                  <td>{elem.cardsCount}</td>
                  <td>{elem.updated.slice(0, 10)}</td>
                  <td>{elem.user_name}</td>

                  <td className={s.actionsBlock}>
                    {isMyPacks ? (
                      <>
                        <img className={s.actions} src={learn} alt="learn" />
                        <img
                          onClick={() =>
                            updatePackHandler({
                              cardsPack: {
                                _id: '642a7ef4761a7a9b7c06e74c',
                                name: 'Updated',
                              },
                            })
                          }
                          src={pencil}
                          alt="pencil"
                        />
                        <img onClick={deletePackHandler} src={remove} alt="remove" />
                      </>
                    ) : (
                      <img className={s.actions} src={learn} alt="learn" />
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
