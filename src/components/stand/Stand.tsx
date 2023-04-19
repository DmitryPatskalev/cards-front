import React, { ChangeEvent, useState } from 'react'

import s from 'components/stand/Stand.module.scss'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperCheckBox } from 'components/super-components/checkBox/SuperCheckBox'
import { SuperInput } from 'components/super-components/input/SuperInput'

export const Stand = () => {
  const [stateForAllInputs, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [stateForAllCheckBoxes, setChecked] = useState<boolean>(false)

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const setErrorInputHandler = () => {
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
          <SuperInput type="text" value={stateForAllInputs} onChange={onChangeInputHandler} />
        </div>
        <div>
          <SuperInput
            type="text"
            value={stateForAllInputs}
            onChange={onChangeInputHandler}
            error={error}
            onEnter={setErrorInputHandler}
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
