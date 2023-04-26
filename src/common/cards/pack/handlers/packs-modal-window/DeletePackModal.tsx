import React from 'react'

import { createPortal } from 'react-dom'

import s from 'common/cards/pack/handlers/packs-modal-window/ModalWindow.module.scss'
import close from 'common/utils/img/icon-close.svg'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperModal } from 'components/super-components/modal/SuperModal'

type DeletePackModalPropsType = {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  id: string
  deleteHandler: (id: string) => void
}

export const DeletePackModal: React.FC<DeletePackModalPropsType> = ({
  title,
  open,
  setOpen,
  name,
  id,
  deleteHandler,
}) => {
  const closeModalWindow = () => {
    setOpen(false)
  }

  const deletePackHandler = () => {
    deleteHandler(id)
    closeModalWindow()
  }

  return (
    <div>
      {open &&
        createPortal(
          <SuperModal
            width={360}
            height={280}
            show={open}
            enableBackground={open}
            backgroundOnClick={closeModalWindow}
          >
            <div className={s.modalContainer}>
              <div className={s.titleBlock}>
                <Title title={title} />
                <img onClick={closeModalWindow} src={close} alt="close" />
              </div>
              <div className={s.deleteModalBlock}>
                <div className={s.packNameBlock}>
                  Do you really want to remove
                  <span className={s.namePack}>{name.slice(0, 30)}</span>
                  All cards will be deleted
                </div>
              </div>
              <SuperButton onClick={deletePackHandler} xType={'red'}>
                Delete
              </SuperButton>
            </div>
          </SuperModal>,
          document.body
        )}
    </div>
  )
}
