import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  KeyboardEvent,
} from 'react'

import s from './SuperInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
}

export const SuperInput: React.FC<SuperInputTextPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  id,

  ...restProps
}) => {
  const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.currentTarget.value)
  }

  const onKeyPressCallBack = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e)
    onEnter && e.key === 'Enter' && onEnter()
  }

  const finalSpanClassName = s.error + (spanClassName ? ' ' + spanClassName : '')

  const finalInputClassName =
    s.input +
    (error ? ' ' + s.errorInput : ' ' + s.superInput) +
    (className ? ' ' + s.className : '') // задача на смешивание классов

  return (
    <div className={s.inputWrapper}>
      <input
        id={id}
        type="text"
        onChange={onChangeCallBack}
        onKeyPress={onKeyPressCallBack}
        className={finalInputClassName}
        {...restProps}
      />
      <div className={finalSpanClassName}>{error}</div>
    </div>
  )
}
