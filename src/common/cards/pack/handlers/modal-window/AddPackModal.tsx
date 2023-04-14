import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

import { NewPackType } from 'api/packs-api'
import { useAppDispatch } from 'app/store'
import s from 'common/cards/pack/handlers/modal-window/ModalWindow.module.scss'
import { createNewPacksTC } from 'common/cards/pack/packs-reducer'
import form from 'common/utils/form/FormFields.module.scss'
import close from 'common/utils/img/icon-close.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperCheckBox } from 'components/super-components/checkBox/SuperCheckBox'
import { SuperInput } from 'components/super-components/input/SuperInput'
import { SuperModal } from 'components/super-components/modal/SuperModal'

type AddPackModalPropsType = {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
}

export const AddPackModal: React.FC<AddPackModalPropsType> = ({ title, open, setOpen }) => {
  const [packName, setPackName] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const closeModalWindow = () => setOpen(false)

  const addNewPack = (data: NewPackType) => {
    if (packName.trim() !== '') {
      dispatch(createNewPacksTC(data))
      closeModalWindow()
      setPackName('')
    } else {
      setError('Title is required! ')
    }
  }

  const onChangeNewPack = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setPackName(e.currentTarget.value)
  }

  return (
    <div>
      <SuperModal
        width={360}
        height={280}
        show={open}
        enableBackground={open}
        backgroundOnClick={closeModalWindow}
        modalStyle={{}}
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
                value={packName}
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
            onClick={() => addNewPack({ cardsPack: { name: packName, private: checkBox } })}
            xType={'default'}
          >
            Save
          </SuperButton>
        </div>
      </SuperModal>
    </div>
  )
}
