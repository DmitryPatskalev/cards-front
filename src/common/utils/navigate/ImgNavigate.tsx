import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './ImgNavigate.module.scss'

import leftArrow from 'common/utils/img/leftArrow.svg'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'

type ImgNavigatePropsType = {
  title: string
}
export const ImgNavigate: React.FC<ImgNavigatePropsType> = ({ title }) => {
  const navigate = useNavigate()

  return (
    <div className={s.navigationToPack}>
      <img
        onClick={() => navigate('/cards/pack')}
        className={s.leftArrow}
        src={leftArrow}
        alt="leftArrow"
      />
      <SubTitle title={title} />
    </div>
  )
}
