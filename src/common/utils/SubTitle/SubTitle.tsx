import React from 'react'

import s from './SubTitle.module.scss'

type SubTitleType = {
  title: string
}
export const SubTitle: React.FC<SubTitleType> = ({ title }) => {
  return (
    <>
      <span className={s.title}>{title}</span>
    </>
  )
}
