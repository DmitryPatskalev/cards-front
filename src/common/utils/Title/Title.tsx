import React from 'react'

import s from './Title.module.scss'

type TitleNameType = {
  title: string
}

export const Title: React.FC<TitleNameType> = ({ title }) => {
  return <div className={s.title}>{title}</div>
}

export default Title
