import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { PackType } from 'api/packs-api'
import { useAppDispatch } from 'app/store'
import { DeleteItemModal } from 'common/cards/pack/handlers/packs-modal-window/DeleteItemModal'
import { UpdatePackModal } from 'common/cards/pack/handlers/packs-modal-window/UpdatePackModal'
import { deletePackTC } from 'common/cards/pack/packs-reducer'
import learn from 'common/utils/img/learn.svg'
import pencil from 'common/utils/img/pencil-line-light.svg'
import remove from 'common/utils/img/remove.svg'

type TableActionsPropsType = {
  pack: PackType
  id: string
}

export const PacksModalActions: React.FC<TableActionsPropsType> = ({ pack, id }) => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleOpenUpdateModal = () => setShowUpdateModal(true)
  const handleOpenDeleteModal = () => setShowDeleteModal(true)

  const handleOpenLearnPack = () => {
    navigate(`/cards/learn/${pack._id}`)
  }

  const deletePackHandler = (id: string) => {
    dispatch(deletePackTC(id))
  }

  return (
    <>
      {pack.user_id === id && pack.cardsCount ? (
        <>
          <button onClick={handleOpenLearnPack} disabled={!pack.cardsCount}>
            <img src={learn} alt="learn" />
          </button>
          <button onClick={handleOpenUpdateModal}>
            <img src={pencil} alt="pencil" />
          </button>
          <button onClick={handleOpenDeleteModal}>
            <img src={remove} alt="remove" />
          </button>
        </>
      ) : (
        <>
          <button onClick={handleOpenLearnPack} disabled={!pack.cardsCount}>
            <img src={learn} alt="learn" />
          </button>
        </>
      )}

      <UpdatePackModal
        title="Edit pack"
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
        id={pack._id}
        name={pack.name}
      />

      <DeleteItemModal
        title="Delete Pack"
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        id={pack._id}
        name={pack.name}
        deleteHandler={deletePackHandler}
      />
    </>
  )
}
