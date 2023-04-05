import React, { SyntheticEvent, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import clearFilter from '../../../utils/img/clear-filter.svg'
import {
  getPacksTC,
  setIsMyPacks,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setPageAC,
  setPageCountAC,
  setSearchPacksAC,
  setSortCardsAC,
} from '../packs-reducer'

import s from './Handler.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { SuperButton } from 'components/super-components/button/SuperButton'
import { SuperDebounceInput } from 'components/super-components/debounce/SuperDebounceInput'
import { SuperPagination } from 'components/super-components/pagination/SuperPagination'
import { Range } from 'components/super-components/range/Range'

export const Handlers = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { page, pageCount, cardPacksTotalCount, packName, min, max, isMyPacks, sortCards } =
    useAppSelector(state => state.packs)

  const removeQueryParams = () => {
    const queryPage = searchParams.get('page')
    const queryPageCount = searchParams.get('pageCount')
    const queryPackName = searchParams.get('packName')
    const queryMin = searchParams.get('min')
    const queryMax = searchParams.get('max')
    const querySort = searchParams.get('sortCards')

    if (queryPage || queryPageCount || queryPackName || queryMin || queryMax || querySort) {
      searchParams.delete('page')
      searchParams.delete('pageCount')
      searchParams.delete('packName')
      searchParams.delete('min')
      searchParams.delete('max')
      searchParams.delete('sortCards')

      dispatch(setPageAC(1))
      dispatch(setPageCountAC(5))
      dispatch(setSearchPacksAC(''))
      dispatch(setMinCardsCountAC(0))
      dispatch(setMaxCardsCountAC(110))
      dispatch(setSortCardsAC(''))

      setSearchParams(searchParams)
    }
  }

  const getMyPacksHandler = () => {
    dispatch(setIsMyPacks(true))
  }

  const getAllPacksHandler = () => {
    dispatch(setIsMyPacks(false))
  }

  const onChangeText = (newPackName: string) => {
    dispatch(setSearchPacksAC(newPackName))
    const querySearch = newPackName !== '' ? { packName: newPackName + '' } : {}
    const { packName, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...querySearch }

    setSearchParams(allQuery)
  }

  const onChangePagination = (newPage: number, newPageCount: number) => {
    dispatch(setPageAC(newPage))
    dispatch(setPageCountAC(newPageCount))
    const queryPage = newPage !== 1 ? { page: newPage + '' } : {}
    const queryCount = newPageCount !== 5 ? { pageCount: newPageCount + '' } : {}
    const { page, pageCount, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...queryPage, ...queryCount }

    setSearchParams(allQuery)
  }

  const querySearch = () => {
    dispatch(getPacksTC())
  }

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

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPacksTC())
    }
  }, [page, pageCount, min, max, isMyPacks, sortCards])

  return (
    <>
      <div className={s.handlersContainer}>
        <div className={s.searchBlock}>
          <SubTitle title="Search" />

          <SuperDebounceInput
            onChangeText={onChangeText}
            onDebounceChange={querySearch}
            value={packName}
            className={s.searchInput}
            type="text"
            placeholder="Provide your text"
          />
        </div>

        <div className={s.buttonBlock}>
          <SubTitle title="Show packs cards" />
          <div className={s.buttons}>
            <SuperButton
              onClick={getMyPacksHandler}
              className={s.switch}
              xType={isMyPacks ? 'default' : 'secondary'}
            >
              My
            </SuperButton>

            <SuperButton
              onClick={getAllPacksHandler}
              className={s.switch}
              xType={isMyPacks ? 'secondary' : 'default'}
            >
              All
            </SuperButton>
          </div>
        </div>

        <div className={s.rangeBlock}>
          <SubTitle title="Number of cards" />

          <div className={s.range}>
            <div className={s.rangeMinCount}>{min}</div>
            <Range value={[min, max]} onChangeCommitted={onChangeRange} />
            <div className={s.rangeMaxCount}>{max}</div>
          </div>
        </div>

        <div className={s.filterClearBlock}>
          <div title="Clear all filters" onClick={removeQueryParams} className={s.filterClear}>
            <img className={s.imageFilter} src={clearFilter} alt={'edit'} />
          </div>
        </div>
      </div>

      <div className={s.paginationContainer}>
        <SuperPagination
          title="Cards per Page"
          page={page}
          pageCount={pageCount}
          cardPacksTotalCount={cardPacksTotalCount}
          onChange={onChangePagination}
        />
      </div>
    </>
  )
}
