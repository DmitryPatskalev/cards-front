import React, { ChangeEvent, useState } from 'react'

import { PackDomainType, UpdatedPackType } from 'api/packs-api'
import { useAppDispatch } from 'app/store'
import s from 'common/cards/pack/handlers/modal-window/ModalWindow.module.scss'
import { updatePackTC } from 'common/cards/pack/packs-reducer'
import form from 'common/utils/form/FormFields.module.scss'
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
  name: string
  id: string
}

export const UpdatePackModal: React.FC<UpdatePackModalPropsType> = ({
  title,
  open,
  setOpen,
  name,
  id,
}) => {
  const [newName, setNewName] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const closeModalWindow = () => {
    setOpen(false)
    setNewName('')
  }

  const savePackHandler = (data: UpdatedPackType) => {
    if (newName.trim() !== '') {
      dispatch(updatePackTC(data))
      closeModalWindow()
      setNewName('')
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
            <img onClick={closeModalWindow} src={close} alt="" />
          </div>
          <div className={`${form.inputFieldContainer} ${s.inputContainer}`}>
            <div className={form.titleFieldForm}>
              <SubTitle title="Pack Name" />
            </div>
            <div className={form.inputFieldBlock}>
              <SuperInput
                value={newName}
                onChange={onChangeNewPack}
                placeholder="Type pack name"
                className={form.inputForm}
                type="text"
                error={error}
              />
            </div>
          </div>
          <div className={s.checkboxBlock}>
            <SuperCheckBox onChangeChecked={setCheckBox}>Private pack</SuperCheckBox>
          </div>
          <SuperButton
            onClick={() =>
              savePackHandler({ cardsPack: { _id: id, name: newName, private: checkBox } })
            }
            xType={'default'}
          >
            Save
          </SuperButton>
        </div>
      </SuperModal>
    </div>
  )
}
