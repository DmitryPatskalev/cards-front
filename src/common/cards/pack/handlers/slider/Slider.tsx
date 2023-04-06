import React, { SyntheticEvent } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { Range } from '../../../../../components/super-components/range/Range'
import { SubTitle } from '../../../../utils/SubTitle/SubTitle'
import { setMaxCardsCountAC, setMinCardsCountAC } from '../../packs-reducer'
import s from '../Handler.module.scss'

export const Slider = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { min, max } = useAppSelector(state => state.packs)
  const dispatch = useAppDispatch()

  const onChangeRange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      dispatch(setMinCardsCountAC(newValue[0]))
      dispatch(setMaxCardsCountAC(newValue[1]))
      const queryMin = newValue[0] !== 0 ? { min: newValue[0] + '' } : {}
      const queryMax = newValue[1] !== 110 ? { max: newValue[1] + '' } : {}
      const { min, max, ...lastQueries } = Object.fromEntries(searchParams)
      const allQuery: any = { ...lastQueries, ...queryMin, ...queryMax }

      setSearchParams(allQuery)
    }
  }

  return (
    <div className={s.rangeBlock}>
      <SubTitle title="Number of cards" />
      <div className={s.range}>
        <div className={s.rangeMinCount}>{min}</div>
        <Range value={[min, max]} onChangeCommitted={onChangeRange} />
        <div className={s.rangeMaxCount}>{max}</div>
      </div>
    </div>
  )
}
