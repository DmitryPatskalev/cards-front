import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { PackType } from 'api/packs-api'
import { DeletePackModal } from 'common/cards/pack/handlers/modal-window/DeletePackModal'
import { UpdatePackModal } from 'common/cards/pack/handlers/modal-window/UpdatePackModal'
import learn from 'common/utils/img/learn.svg'
import pencil from 'common/utils/img/pencil-line-light.svg'
import remove from 'common/utils/img/remove.svg'

type TableActionsPropsType = {
  data: PackType // твой тип элемента таблицы
}

export const TableActions: React.FC<TableActionsPropsType> = ({ data }) => {
  const [showLearnModal, setShowLearnModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const handleOpenUpdateModal = () => setShowUpdateModal(true)
  const handleOpenDeleteModal = () => setShowDeleteModal(true)

  return (
    <>
      <button onClick={() => navigate(`/cards/card/${data._id}`)} disabled={!data.cardsCount}>
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
        id={data._id}
        name={data.name}
      />

      <DeletePackModal
        title="Delete Pack"
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        id={data._id}
        name={data.name}
      />
    </>
  )
}
