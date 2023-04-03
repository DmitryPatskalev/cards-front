import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState } from 'react'

import { SuperInput } from 'components/super-components/input/SuperInput'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperDebounceInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  type?: string
  error?: ReactNode
  spanClassName?: string
} & {
  onDebounceChange?: (value: string) => void
}

export const SuperDebounceInput: React.FC<SuperDebounceInputPropsType> = ({
  onChangeText,
  onDebounceChange,
  ...restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const onChangeTextCallBack = (value: string) => {
    onChangeText?.(value)

    if (onDebounceChange) {
      timerId && clearInterval(timerId)
      const id: number = +setTimeout(() => {
        onDebounceChange(value)
        setTimerId(undefined)
      }, 1000)

      setTimerId(id)
    }
  }

  return (
    <div>
      <SuperInput onChangeText={onChangeTextCallBack} type="text" {...restProps} />
    </div>
  )
}
