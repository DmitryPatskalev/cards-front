import React, { ChangeEvent, useState } from 'react'

import s from './Stand.module.scss'
import { SuperButton } from './superButton/SuperButton'
import { SuperCheckBox } from './superCheckBox/SuperCheckBox'
import { SuperInput } from './superInput/SuperInput'

export const Stand = () => {
  const [stateForAllInputs, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [stateForAllCheckBoxes, setChecked] = useState<boolean>(false)

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const setErrorInputHundler = () => {
    setError(stateForAllInputs.trim() ? '' : 'Error')
    setValue('')
  }

  const onChangeCheckedInput = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }

  return (
    <div className={s.stand}>
      <div className={s.inputs}>
        <div>
          <SuperInput value={stateForAllInputs} onChange={onChangeInputHandler} />
        </div>
        <div>
          <SuperInput
            value={stateForAllInputs}
            onChange={onChangeInputHandler}
            error={error}
            onEnter={setErrorInputHundler}
          />
        </div>
      </div>

      <div className={s.buttons}>
        <SuperButton xType={'default'}>default</SuperButton>
        <SuperButton xType={'red'}>red</SuperButton>
        <SuperButton xType={'disabled'} disabled>
          disabled
        </SuperButton>
        <SuperButton xType={'secondary'}>secondary</SuperButton>
      </div>

      <div className={s.checkboxes}>
        <SuperCheckBox checked={stateForAllCheckBoxes} onChangeChecked={setChecked}>
          some text
        </SuperCheckBox>

        <SuperCheckBox checked={stateForAllCheckBoxes} onChange={onChangeCheckedInput} />
      </div>
    </div>
  )
}
