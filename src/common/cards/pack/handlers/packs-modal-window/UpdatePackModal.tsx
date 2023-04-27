import React, { ChangeEvent, useState } from 'react'

import { createPortal } from 'react-dom'

import s from './ModalStyle.module.scss'

import { UpdatedPackType } from 'api/packs-api'
import { useAppDispatch } from 'app/store'
import { updatePackTC } from 'common/cards/pack/packs-reducer'
import close from 'common/utils/img/icon-close.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperCheckBox } from 'components/super-components/checkBox/SuperCheckBox'
import { SuperInput } from 'components/super-components/input/SuperInput'
import { SuperModal } from 'components/super-components/modal/SuperModal'

type UpdatePackModalPropsType = {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
  id: string
  name: string
}

export const UpdatePackModal: React.FC<UpdatePackModalPropsType> = ({
  title,
  open,
  setOpen,
  id,
  name,
}) => {
  const [newName, setNewName] = useState(name)
  const [checkBox, setCheckBox] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const closeModalWindow = () => {
    setOpen(false)
    setNewName(newName)
  }

  const savePackHandler = (data: UpdatedPackType) => {
    if (newName.trim() !== '') {
      dispatch(updatePackTC(data))
      setOpen(false)
      closeModalWindow()
    } else {
      setError('Title is required! ')
    }
  }

  const onChangeNewPack = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewName(e.currentTarget.value)
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

              <div className={s.inputBlock}>
                <SubTitle title="Pack Name" />
                <SuperInput
                  value={newName}
                  onChange={onChangeNewPack}
                  className={s.inputForm}
                  type="text"
                  error={error}
                  autoFocus
                />
              </div>

              <div className={s.checkboxBlock}>
                <SuperCheckBox onChangeChecked={setCheckBox}>Private pack</SuperCheckBox>
              </div>
              <div className={s.actionButtonBlock}>
                <SuperButton
                  className={s.button}
                  onClick={() =>
                    savePackHandler({ cardsPack: { _id: id, name: newName, private: checkBox } })
                  }
                  xType={!error ? 'default' : 'disabled'}
                  disabled={!!error}
                >
                  Save
                </SuperButton>
              </div>
            </div>
          </SuperModal>,
          document.body
        )}
    </div>
  )
}
