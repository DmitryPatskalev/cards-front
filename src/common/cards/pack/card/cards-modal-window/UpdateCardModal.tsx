import React, { ChangeEvent, FC, useState } from 'react'

import { createPortal } from 'react-dom'

import { useAppDispatch } from 'app/store'
import { updateCardTC } from 'common/cards/pack/card/cards-reducer'
import style from 'common/cards/pack/handlers/packs-modal-window/ModalStyle.module.scss'
import close from 'common/utils/img/icon-close.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { Title } from 'common/utils/Title/Title'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperInput } from 'components/super-components/input/SuperInput'
import { SuperModal } from 'components/super-components/modal/SuperModal'
import { SuperSelect } from 'components/super-components/select/SuperSelect'

type UpdateModalPropsType = {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
  question: string
  answer: string
}
export const UpdateCardModal: FC<UpdateModalPropsType> = ({
  id,
  open,
  setOpen,
  question,
  answer,
}) => {
  const [newQuestion, setNewQuestion] = useState(question)
  const [newAnswer, setNewAnswer] = useState(answer)
  const [errorQuestion, setErrorQuestion] = useState<string | null>(null)
  const [errorAnswer, setErrorAnswer] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const closeModalWindow = () => {
    setOpen(false)
  }

  const saveCardHandler = () => {
    if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
      dispatch(
        updateCardTC({
          card: { _id: id, question: newQuestion, answer: newAnswer },
        })
      )
      closeModalWindow()
    } else {
      setErrorQuestion('Title is required!')
      setErrorAnswer('Title is required!')
    }
  }

  const onChangeNewQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorQuestion(null)
    setNewQuestion(e.currentTarget.value)
  }

  const onChangeNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorAnswer(null)
    setNewAnswer(e.currentTarget.value)
  }

  const data = [
    { id: 1, value: 'Text' },
    { id: 2, value: 'Picture' },
  ]

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
            <div className={style.modalContainer}>
              <div className={style.titleBlock}>
                <Title title="Add new Card" />
                <img onClick={closeModalWindow} src={close} alt="close" />
              </div>

              <div className={style.inputBlock}>
                <SubTitle title="Choose a question format" />
                <SuperSelect options={data} className={style.inputForm} />
              </div>

              <div className={style.inputBlock}>
                <SubTitle title="Question" />
                <SuperInput
                  value={newQuestion}
                  onChange={onChangeNewQuestion}
                  className={style.inputForm}
                  type="text"
                  error={errorQuestion}
                  autoFocus
                />
              </div>

              <div className={style.inputBlock}>
                <SubTitle title="Answer" />
                <SuperInput
                  value={newAnswer}
                  onChange={onChangeNewAnswer}
                  className={style.inputForm}
                  type="text"
                  error={errorAnswer}
                  autoFocus
                />
              </div>
              <div className={style.actionButtonBlock}>
                <SuperButton
                  className={style.button}
                  onClick={saveCardHandler}
                  xType={!errorQuestion || !errorAnswer ? 'default' : 'disabled'}
                  disabled={!!errorQuestion && !!errorAnswer}
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
