import React from 'react'

import up from '../../../common/utils/img/Polygon 2.svg'
import down from '../../../common/utils/img/Polygon 5.svg'
import sort_up from '../../../common/utils/img/sort_up.svg'

import s from './SuperSort.module.scss'

const upIcon = down
const downIcon = up
const noneIcon = sort_up

export type SuperSortPropsType = {
  sort: string
  value: string
  onChange: (newSort: string) => void
}

const pureChange = (sort: string, down: string, up: string) => {
  // eslint-disable-next-line no-nested-ternary
  return sort === down ? up : sort === up ? '' : down
}

export const SuperSort: React.FC<SuperSortPropsType> = ({ sort, onChange, value }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallBack = () => {
    onChange(pureChange(sort, down, up))
  }

  // eslint-disable-next-line no-nested-ternary
  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon

  return (
    <span className={s.sortIconContainer}>
      <button onClick={onChangeCallBack}>
        <img src={icon} alt="upIcon" />
      </button>
    </span>
  )
}
