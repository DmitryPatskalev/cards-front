import React from 'react'

import s from './SubTitle.module.scss'

type SubTitleType = {
  title: string
}
export const SubTitle: React.FC<SubTitleType> = ({ title }) => {
  return <div className={s.title}>{title}</div>
}
