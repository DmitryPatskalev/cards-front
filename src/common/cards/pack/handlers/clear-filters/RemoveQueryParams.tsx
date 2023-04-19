import React from 'react'

import { useSearchParams } from 'react-router-dom'

import clearFilter from '../../../../utils/img/clear-filter.svg'
import {
  setMaxCardsCount,
  setMinCardsCount,
  setPage,
  setPageCount,
  setSearchByPackName,
  setSortPacks,
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

      dispatch(setPage(1))
      dispatch(setPageCount(5))
      dispatch(setSearchByPackName(''))
      dispatch(setMinCardsCount(0))
      dispatch(setMaxCardsCount(110))
      dispatch(setSortPacks(''))

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
