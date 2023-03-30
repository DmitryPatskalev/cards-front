import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState } from 'react'

import { SuperInput } from '../../../../superComponents/superInput/SuperInput'

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
      const id: number = +setTimeout(() => {
        onDebounceChange(value)
        setTimerId(undefined)
      }, 3000)

      setTimerId(id)

      return () => {
        clearTimeout(timerId)
      }
    }
  }

  return (
    <div>
      <SuperInput onChangeText={onChangeTextCallBack} type="text" {...restProps} />
    </div>
  )
}
