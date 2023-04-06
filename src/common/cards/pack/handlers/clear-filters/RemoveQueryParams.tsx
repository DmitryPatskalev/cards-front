import React from 'react'

import { useSearchParams } from 'react-router-dom'

import clearFilter from '../../../../utils/img/clear-filter.svg'
import {
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setPageAC,
  setPageCountAC,
  setSearchPacksAC,
  setSortPacksAC,
} from '../../packs-reducer'
import s from '../Handler.module.scss'

import { useAppDispatch } from 'app/store'

export const RemoveQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const removeQueryParams = () => {
    const queryPage = searchParams.get('page')
    const queryPageCount = searchParams.get('pageCount')
    const queryPackName = searchParams.get('packName')
    const queryMin = searchParams.get('min')
    const queryMax = searchParams.get('max')
    const querySort = searchParams.get('sortPacks')

    if (queryPage || queryPageCount || queryPackName || queryMin || queryMax || querySort) {
      searchParams.delete('page')
      searchParams.delete('pageCount')
      searchParams.delete('packName')
      searchParams.delete('min')
      searchParams.delete('max')
      searchParams.delete('sortPacks')

      dispatch(setPageAC(1))
      dispatch(setPageCountAC(5))
      dispatch(setSearchPacksAC(''))
      dispatch(setMinCardsCountAC(0))
      dispatch(setMaxCardsCountAC(110))
      dispatch(setSortPacksAC(''))

      setSearchParams(searchParams)
    }
  }

  return (
    <div className={s.filterClearBlock}>
      <div title="Clear all filters" onClick={removeQueryParams} className={s.filterClear}>
        <img className={s.imageFilter} src={clearFilter} alt={'edit'} />
      </div>
    </div>
  )
}
