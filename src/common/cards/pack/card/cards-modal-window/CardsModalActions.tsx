import React, { FC, useState } from 'react'

import { CardType } from 'api/cards-api'
import { DeletePackModal } from 'common/cards/pack/handlers/packs-modal-window/DeletePackModal'

type CardsModalActionsPropsType = {
  card: CardType
}

export const CardsModalActions: FC<CardsModalActionsPropsType> = ({ card }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  return (
    <div>
      <DeletePackModal
        title="Delete Pack"
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        id={card._id}
        name={card.answer}
        deleteHandler={() => console.log('Close')}
      />
    </div>
  )
}
