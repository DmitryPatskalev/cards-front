import React from 'react'

import { useAppDispatch } from 'app/store'
import s from 'common/cards/pack/handlers/modal-window/ModalWindow.module.scss'
import { deletePackTC } from 'common/cards/pack/packs-reducer'
import form from 'common/utils/form/FormFields.module.scss'
import close from 'common/utils/img/icon-close.svg'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperModal } from 'components/super-components/modal/SuperModal'

type UpdatePackModalPropsType = {
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  id: string
  title: string
}

export const DeletePackModal: React.FC<UpdatePackModalPropsType> = ({
  open,
  setOpen,
  name,
  id,
  title,
}) => {
  const dispatch = useAppDispatch()

  const closeModalWindow = () => {
    setOpen(false)
  }

  const deletePackHandler = (id: string) => {
    dispatch(deletePackTC(id))
    closeModalWindow()
  }

  return (
    <div>
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
          <div className={`${form.inputFieldContainer} ${s.inputContainer}`}>
            <div className={s.title}>
              <Title title={`Do you really want to remove ${name}. All cards will be deleted.`} />
            </div>
          </div>

          <SuperButton onClick={() => deletePackHandler(id)} xType={'red'}>
            Delete
          </SuperButton>
        </div>
      </SuperModal>
    </div>
  )
}
