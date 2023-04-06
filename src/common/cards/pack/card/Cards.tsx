import React from 'react'

import { useNavigate } from 'react-router-dom'

import { SuperButton } from '../../../../components/super-components/button/SuperButton'
import { SuperDebounceInput } from '../../../../components/super-components/debounce/SuperDebounceInput'
import style from '../../../auth/profile/Profile.module.scss'
import common from '../../../common-css-style/common-container.module.scss'
import table from '../../../common-css-style/Table.module.scss'
import leftArrow from '../../../utils/img/leftArrow.svg'
import { SubTitle } from '../../../utils/SubTitle/SubTitle'
import { Title } from '../../../utils/Title/Title'
import pack from '../Packs.module.scss'

import s from './Cards.module.scss'

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

      <div className={s.searchBlock}>
        <SubTitle title="Search" />
        <SuperDebounceInput
          onChangeText={() => console.log('click')}
          onDebounceChange={() => console.log('click')}
          value={''}
          className={s.searchInputCards}
          type="text"
          placeholder="Provide your text"
        />
      </div>
      <table className={table.table}>
        <thead>
          <tr>
            <th>
              <SubTitle title="Question" />
            </th>
            <th>
              <SubTitle title="Answer" />
            </th>
            <th>
              <SubTitle title="Last Updated" />
            </th>
            <th>
              <SubTitle title="Grade" />
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
