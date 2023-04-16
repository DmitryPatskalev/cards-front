import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'

import { useAppSelector } from 'app/store'
import { DeletePackModal } from 'common/cards/pack/handlers/modal-window/DeletePackModal'
import { UpdatePackModal } from 'common/cards/pack/handlers/modal-window/UpdatePackModal'
import { SortPacks } from 'common/cards/pack/handlers/sort-packs/SortPacks'
import s from 'common/common-css-style/Table.module.scss'
import { Loading } from 'common/utils/loading/Loading'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'

export const PacksTable = () => {
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const { cardPacks, isLoading, sortPacks } = useAppSelector(state => state.packs)

  const navigate = useNavigate()

  const myId = '6352ce8810be8e0004d5b4f4'

  return (
    <>
      <table className={s.table}>
        <thead>
          <tr>
            <th>
              <SubTitle title="Name" />
              <SortPacks sort={sortPacks} value="name" />
            </th>
            <th>
              <SubTitle title="Cards" />
              <SortPacks sort={sortPacks} value="cardsCount" />
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
          <tbody>
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {cardPacks.length ? (
              cardPacks.map(p => {
                return (
                  <tr key={p._id}>
                    {!p.cardsCount && p.user_id === myId ? (
                      <td onClick={() => navigate(`/cards/card/${p._id}`)}>
                        <span className={s.tdLink}>{p.name.slice(0, 30)}</span>
                      </td>
                    ) : (
                      <td>{p.name.slice(0, 30)}</td>
                    )}
                    <td>{p.cardsCount}</td>
                    <td>{p.updated.slice(0, 10)}</td>
                    <td>{p.user_name}</td>

                    <td className={s.actionsBlock}>
                      {p.user_id === myId ? (
                        <>
                          <button
                            onClick={() => navigate(`/cards/card/${p._id}`)}
                            disabled={!p.cardsCount}
                          >
                            <img src={learn} alt="learn" />
                          </button>
                          <button onClick={() => setOpen(true)}>
                            <img src={pencil} alt="pencil" />
                          </button>
                          <button onClick={() => console.log(p._id, p.name)}>
                            <img src={remove} alt="remove" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => navigate(`/cards/card/${p._id}`)}
                          disabled={!p.cardsCount}
                        >
                          <img src={learn} alt="learn" />
                        </button>
                      )}
                    </td>
                    <UpdatePackModal
                      title="Edit pack"
                      open={open}
                      setOpen={setOpen}
                      id={p._id}
                      name={p.name}
                    />
                    <DeletePackModal
                      open={openD}
                      setOpen={setOpenD}
                      id={p._id}
                      name={p.name}
                      title="Delete Pack"
                    />
                  </tr>
                )
              })
            ) : (
              <tr className={s.emptyPacks}>
                <td>
                  <Title title="PacksContainer not found. Try to change your search parameters" />
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </>
  )
}
