import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from './SuperCheckBox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperCheckBoxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

export const SuperCheckBox: React.FC<SuperCheckBoxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  id,
  ...restProps
}) => {
  const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeChecked?.(e.currentTarget.checked)
  }

  const finalInputClassName = s.checkbox + (className ? ' ' + className : '')

  return (
    <div className={s.label}>
      <input
        id={id}
        type="checkbox"
        onChange={onChangeCallBack}
        className={finalInputClassName}
        {...restProps}
      />
      {children && <span className={s.spanClassName}>{children}</span>}
    </div>
  )
}
