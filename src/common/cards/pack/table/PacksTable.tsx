import React, { FC, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import learn from '../../../utils/img/learn.svg'
import pencil from '../../../utils/img/pencil-line-light.svg'
import remove from '../../../utils/img/remove.svg'

import { useAppDispatch, useAppSelector } from 'app/store'
import { DeletePackModal } from 'common/cards/pack/handlers/modal-window/DeletePackModal'
import { UpdatePackModal } from 'common/cards/pack/handlers/modal-window/UpdatePackModal'
import { SortPacks } from 'common/cards/pack/handlers/sort-packs/SortPacks'
import { deletePackTC } from 'common/cards/pack/packs-reducer'
import s from 'common/common-css-style/Table.module.scss'
import { Loading } from 'common/utils/loading/Loading'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'

export const PacksTable = () => {
  const [open, setOpen] = useState(false)
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
                          <TableActions data={p} />

                          {/*<button*/}
                          {/*  onClick={() => navigate(`/cards/card/${p._id}`)}*/}
                          {/*  disabled={!p.cardsCount}*/}
                          {/*>*/}
                          {/*  <img src={learn} alt="learn" />*/}
                          {/*</button>*/}
                          {/*<button onClick={() => setOpen(true)}>*/}
                          {/*  <img src={pencil} alt="pencil" />*/}
                          {/*</button>*/}
                          {/*<button onClick={() => setOpen(true)}>*/}
                          {/*  <img src={remove} alt="remove" />*/}
                          {/*</button>*/}
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
                    {/*<UpdatePackModal*/}
                    {/*  title="Edit pack"*/}
                    {/*  open={open}*/}
                    {/*  setOpen={setOpen}*/}
                    {/*  id={p._id}*/}
                    {/*  name={p.name}*/}
                    {/*/>*/}
                    {/*<DeletePackModal*/}
                    {/*  title="Delete Pack"*/}
                    {/*  open={open}*/}
                    {/*  setOpen={setOpen}*/}
                    {/*  id={p._id}*/}
                    {/*  name={p.name}*/}
                    {/*/>*/}
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

type Props = {
  data: any // твой тип элемента таблицы
}

export const TableActions: FC<Props> = ({ data }) => {
  const [modalNameOpen, setModalNameOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleOpenModal = () => setModalNameOpen(true)

  return (
    <>
      <button onClick={() => navigate(`/cards/card/${data._id}`)} disabled={!data.cardsCount}>
        <img src={learn} alt="learn" />
      </button>
      <button onClick={handleOpenModal}>
        <img src={pencil} alt="pencil" />
      </button>
      <button onClick={handleOpenModal}>
        <img src={remove} alt="remove" />
      </button>

      <UpdatePackModal
        title="Edit pack"
        open={modalNameOpen}
        setOpen={handleOpenModal}
        id={data._id}
        name={data.name}
      />

      <DeletePackModal
        title="Delete Pack"
        open={modalNameOpen}
        setOpen={handleOpenModal}
        id={data._id}
        name={data.name}
      />
    </>
  )
}
