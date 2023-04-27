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
}

export const PacksModalActions: React.FC<TableActionsPropsType> = ({ pack }) => {
  const [showLearnModal, setShowLearnModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const handleOpenUpdateModal = () => setShowUpdateModal(true)
  const handleOpenDeleteModal = () => setShowDeleteModal(true)

  const dispatch = useAppDispatch()

  const deletePackHandler = (id: string) => {
    dispatch(deletePackTC(id))
  }

  return (
    <>
      <button onClick={() => navigate(`/cards/card/${pack._id}`)} disabled={!pack.cardsCount}>
        <img src={learn} alt="learn" />
      </button>
      <button onClick={handleOpenUpdateModal}>
        <img src={pencil} alt="pencil" />
      </button>
      <button onClick={handleOpenDeleteModal}>
        <img src={remove} alt="remove" />
      </button>

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
