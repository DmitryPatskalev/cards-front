import React, { ChangeEvent, FC, useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './CardsModal.module.scss'

import { NewCardType } from 'api/cards-api'
import { useAppDispatch } from 'app/store'
import { createNewCardTC } from 'common/cards/pack/card/cards-reducer'
import style from 'common/cards/pack/handlers/packs-modal-window/ModalWindow.module.scss'
import close from 'common/utils/img/icon-close.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperInput } from 'components/super-components/input/SuperInput'
import { SuperModal } from 'components/super-components/modal/SuperModal'

type AddCardModalPropsType = {
  open: boolean
  setOpen: (open: boolean) => void
}
export const AddCardModal: FC<AddCardModalPropsType> = ({ open, setOpen }) => {
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { cardsPack_id } = useParams()

  const dispatch = useAppDispatch()

  const closeModalWindow = () => {
    setOpen(false)
  }

  const saveCardHandler = (data: NewCardType) => {
    if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
      dispatch(createNewCardTC(data))
      closeModalWindow()
    } else {
      setError('Title is required!')
    }
  }

  const onChangeNewQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewQuestion(e.currentTarget.value)
  }

  const onChangeNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewAnswer(e.currentTarget.value)
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
        <div className={style.modalContainer}>
          <div className={style.titleBlock}>
            <Title title="Add new Card" />
            <img onClick={closeModalWindow} src={close} alt="close" />
          </div>

          <div className={s.handlersContainer}>
            <div className={s.inputBlock}>
              <SubTitle title="Question" />
              <SuperInput
                value={newQuestion}
                onChange={onChangeNewQuestion}
                className={s.inputForm}
                type="text"
                error={error}
                autoFocus
              />
            </div>

            <div className={s.inputBlock}>
              <SubTitle title="Answer" />
              <SuperInput
                value={newAnswer}
                onChange={onChangeNewAnswer}
                className={s.inputForm}
                type="text"
                error={error}
                autoFocus
              />
            </div>
          </div>

          <SuperButton
            onClick={() =>
              saveCardHandler({
                card: { cardsPack_id, question: newQuestion, answer: newAnswer },
              })
            }
            xType={!error ? 'default' : 'disabled'}
            disabled={!!error}
          >
            Save
          </SuperButton>
        </div>
      </SuperModal>
    </div>
  )
}
