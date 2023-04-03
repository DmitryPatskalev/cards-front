import React, { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import s from 'components/super-components/select/SuperSelect.module.scss'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: number) => void
}
export const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map(o => {
        return (
          <option className={s.option} key={o.id} value={o.value}>
            {o.value}
          </option>
        )
      })
    : []

  const onChangeCallBack = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e)
    onChangeOption?.(+e.currentTarget.value)
  }

  const finalClassname = s.select + (className ? ' ' + className : '')

  return (
    <div>
      <select className={finalClassname} onChange={onChangeCallBack} {...restProps}>
        {mappedOptions}
      </select>
    </div>
  )
}
