import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './ImgNavigate.module.scss'

import leftArrow from 'common/utils/img/leftArrow.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'

type ImgNavigatePropsType = {
  title: string
  onClick?: () => void
}
export const ImgNavigate: React.FC<ImgNavigatePropsType> = ({ title, onClick }) => {
  const navigate = useNavigate()

  const onBack = () => navigate('/cards/pack')

  return (
    <div className={s.navigationToPack}>
      <img onClick={onClick || onBack} className={s.leftArrow} src={leftArrow} alt="leftArrow" />
      <SubTitle title={title} />
    </div>
  )
}
