import React from 'react'

import s from './Title.module.scss'

type TitleNameType = {
  title?: string
  className?: React.ReactNode
}

export const Title: React.FC<TitleNameType> = ({ title, className }) => {
  return <div className={s.title}>{title}</div>
}
