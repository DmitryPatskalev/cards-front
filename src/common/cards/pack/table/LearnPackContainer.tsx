import React from 'react'

import s from './LearnPack.module.scss'

import { useAppSelector } from 'app/store'
import common from 'common/common-css-style/common-container.module.scss'
import { ImgNavigate } from 'common/utils/navigate/ImgNavigate'
import { Title } from 'common/utils/Title/Title'

export const LearnPackContainer = () => {
  const { name } = useAppSelector(state => state.cards)

  return (
    <div className={common.commonContainer}>
      <ImgNavigate title="Back to Pack List" />
      <div className={s.learnPackContainer}>
        <Title title={name} />
        <div className={s.learnPackBlock}>
          <div>
            <Title title={`Question: ${''}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
