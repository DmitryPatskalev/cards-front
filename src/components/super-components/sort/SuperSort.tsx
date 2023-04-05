import React from 'react'

import up from '../../../common/utils/img/Polygon 2.svg'
import down from '../../../common/utils/img/Polygon 5.svg'

import s from './SuperSort.module.scss'

const upIcon = up
const downIcon = down
const noneIcon = '[]'

export type SuperSortPropsType = {
  sort: string
  value: string
  onChange: (newSort: string) => void
}

const pureChange = (sort: string, down: string, up: string) => {
  // if (sort === down) {
  //   return up
  // } else if (sort === up) {
  //   return ''
  // } else {
  //   return down
  // }

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
        <img className={s.sortIcon} src={upIcon} alt="upIcon" />
      </button>
      <button onClick={onChangeCallBack}>
        <img className={s.sortIcon} src={downIcon} alt="downIcon" />
      </button>
    </span>
  )
}
