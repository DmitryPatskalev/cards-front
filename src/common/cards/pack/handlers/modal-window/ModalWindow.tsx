import React, { ChangeEvent, FC } from 'react'

import form from '../../../../utils/form/FormFields.module.scss'
import close from '../../../../utils/img/icon-close.svg'

import s from './ModalWindow.module.scss'

import { NewPackType } from 'api/packs-api'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperCheckBox } from 'components/super-components/checkBox/SuperCheckBox'
import { SuperInput } from 'components/super-components/input/SuperInput'
import { SuperModal } from 'components/super-components/modal/SuperModal'

type ModalWindowPropsType = {
  open: boolean
  width?: number
  height?: number
  backgroundOnClick?: () => void
  modalOnClick?: () => void
  children?: React.ReactNode
  title: string
  addNewPack?: (data: NewPackType) => void
  packName: string
  onChangeNewPack: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ModalWindow: FC<ModalWindowPropsType> = ({
  open,

  width,
  height,
  backgroundOnClick,
  modalOnClick,
  title,
  addNewPack,
  packName,
  onChangeNewPack,
  children,
}) => {
  return (
    <div>
      <SuperModal
        width={360}
        height={280}
        show={open}
        enableBackground={open}
        backgroundOnClick={backgroundOnClick}
        modalStyle={{}}
        modalOnClick={modalOnClick}
      >
        <div className={s.modalContainer}>
          <div className={s.titleBlock}>
            <Title title={title} />
            <img onClick={backgroundOnClick} src={close} alt="" />
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
              />
            </div>
          </div>
          <div className={s.checkboxBlock}>
            <SuperCheckBox>Private pack</SuperCheckBox>
          </div>
          <SuperButton
            onClick={() => (addNewPack ? addNewPack({ cardsPack: { name: packName } }) : {})}
            xType={'default'}
          >
            Save
          </SuperButton>
        </div>

        {children}
      </SuperModal>
    </div>
  )
}
