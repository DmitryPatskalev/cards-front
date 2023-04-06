import React from 'react'

import { useNavigate } from 'react-router-dom'

import { SuperButton } from '../../../../components/super-components/button/SuperButton'
import style from '../../../auth/profile/Profile.module.scss'
import common from '../../../common-css-style/common-container.module.scss'
import leftArrow from '../../../utils/img/leftArrow.svg'
import { SubTitle } from '../../../utils/SubTitle/SubTitle'
import { Title } from '../../../utils/Title/Title'
import pack from '../Packs.module.scss'

export const Cards = () => {
  const navigate = useNavigate()

  return (
    <div className={common.commonContainer}>
      <div className={style.navigationToPack}>
        <img
          onClick={() => navigate('/cards/pack')}
          src={leftArrow}
          alt="leftArrow"
          className={style.leftArrow}
        />
        <SubTitle title="Back to Packs List" />
      </div>
      <div className={pack.navBlock}>
        <Title title="Friend's Pack" />
        <SuperButton xType="default">Learn to Pack</SuperButton>
      </div>
    </div>
  )
}
