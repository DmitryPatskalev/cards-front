import React, { FC, useState } from 'react'

import { CardType } from 'api/cards-api'
import { useAppDispatch, useAppSelector } from 'app/store'
import { UpdateCardModal } from 'common/cards/pack/card/cards-modal-window/UpdateCardModal'
import { deleteCardTC } from 'common/cards/pack/card/cards-reducer'
import { DeleteItemModal } from 'common/cards/pack/handlers/packs-modal-window/DeleteItemModal'
import pencil from 'common/utils/img/pencil-line-light.svg'
import remove from 'common/utils/img/remove.svg'

type CardsModalActionsPropsType = {
  card: CardType
}

export const CardsModalActions: FC<CardsModalActionsPropsType> = ({ card }) => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const { _id } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleOpenDeleteModal = () => setShowDeleteModal(true)
  const handleOpenUpdateModal = () => setShowUpdateModal(true)

  const deleteCardHandler = (id: string) => {
    dispatch(deleteCardTC(id))
  }

  return (
    <>
      <button disabled={card.user_id !== _id} onClick={handleOpenUpdateModal}>
        <img src={pencil} alt="pencil" />
      </button>

      <button disabled={card.user_id !== _id} onClick={handleOpenDeleteModal}>
        <img src={remove} alt="remove" />
      </button>

      <UpdateCardModal
        id={card._id}
        question={card.question}
        answer={card.answer}
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
      />

      <DeleteItemModal
        title="Delete Card"
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        id={card._id}
        name={card.question}
        deleteHandler={deleteCardHandler}
      />
    </>
  )
}
