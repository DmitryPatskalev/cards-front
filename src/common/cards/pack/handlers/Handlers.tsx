import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import clearFilter from '../../../utils/img/clear-filter.svg'
import { SuperDebounceInput } from '../debounce/SuperDebounceInput'
import {
  getMyPacksTC,
  getPacksTC,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setPageAC,
  setPageCountAC,
  setSearchPacksAC,
} from '../packs-reducer'
import { SuperPagination } from '../pagination/SuperPagination'
import { SuperRange } from '../range/SuperRange'

import s from './Handler.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SuperButton } from 'common/superComponents/superButton/SuperButton'
import { SubTitle } from 'common/utils/SubTitle/SubTitle'

export const Handlers = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { page, pageCount, cardPacksTotalCount, packName, min, max } = useAppSelector(
    state => state.packs
  )

  const getMyPacksHandler = () => {
    dispatch(getMyPacksTC())
  }
  const getAllPacksHandler = () => {
    dispatch(getPacksTC())
  }

  const onChangeText = (newPackName: string) => {
    dispatch(setSearchPacksAC(newPackName))
    const querySearch = newPackName !== '' ? { packName: newPackName } : {}
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
  const onChangeRange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setMinCardsCountAC(newValue[0]))
      dispatch(setMaxCardsCountAC(newValue[1]))
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPacksTC())
    }
  }, [page, pageCount, min, max])

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
            <SuperButton onClick={getMyPacksHandler} className={s.switch} xType={'default'}>
              My
            </SuperButton>

            <SuperButton onClick={getAllPacksHandler} className={s.switch} xType={'secondary'}>
              All
            </SuperButton>
          </div>
        </div>

        <div className={s.rangeBlock}>
          <SubTitle title="Number of cards" />

          <div className={s.range}>
            <div className={s.rangeMinCount}>{min}</div>
            <SuperRange value={[min, max]} onChange={onChangeRange} />
            <div className={s.rangeMaxCount}>{max}</div>
          </div>
        </div>

        <div className={s.filterClearBlock}>
          <div className={s.filterClear}>
            <img className={s.imageFilter} src={clearFilter} alt={'edit'} />
          </div>
        </div>
      </div>

      <div className={s.paginationContainer}>
        <SuperPagination
          page={page}
          pageCount={pageCount}
          cardPacksTotalCount={cardPacksTotalCount}
          onChange={onChangePagination}
        />
      </div>
    </>
  )
}
