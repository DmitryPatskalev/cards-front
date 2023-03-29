import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { SuperButton } from '../../../../superComponents/superButton/SuperButton'
import clearFilter from '../../../../utils/img/clear-filter.svg'
import { SubTitle } from '../../../../utils/SubTitle/SubTitle'
import { getAllPackTC, getMyPacksTC, setPageAC, setPageCountAC } from '../../../packs-reducer'
import { SuperDebounceInput } from '../debounce/SuperDebounceInput'
import { SuperPagination } from '../pagination/SuperPagination'

import s from './Handler.module.scss'

export const Handlers = () => {
  const [active, setActive] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [find, setFind] = useState('')

  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { page, pageCount, cardPacksTotalCount } = useAppSelector(state => state.packs)

  const switchMyButtonHandler = () => {
    if (isLoggedIn) {
      dispatch(getMyPacksTC())
    }
    setActive(true)
  }
  const switchAllButtonHandler = () => {
    if (isLoggedIn) {
      dispatch(getAllPackTC({}))
    }
    setActive(false)
  }

  const sendQuery = (packName: string) => {
    dispatch(getAllPackTC({ packName }))
  }

  const onChangeText = (packName: string) => {
    setFind(packName)
    setSearchParams({ params: packName })
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

  useEffect(() => {
    if (isLoggedIn) {
      const params = Object.fromEntries(searchParams)

      dispatch(
        getAllPackTC({
          page: +params.page,
          pageCount: +params.pageCount,
          packName: params.packName,
        })
      )
      setFind(params.packName || '')
    }
  }, [page, pageCount])

  return (
    <>
      <div className={s.handlersContainer}>
        <div className={s.searchBlock}>
          <SubTitle title="Search" />

          <SuperDebounceInput
            onChangeText={onChangeText}
            onDebounceChange={sendQuery}
            value={find}
            className={s.searchInput}
            type="text"
            placeholder="Provide your text"
          />
        </div>
        <div className={s.buttonBlock}>
          <SubTitle title="Show packs cards" />
          <div className={s.buttons}>
            <SuperButton
              onClick={switchMyButtonHandler}
              className={s.switch}
              xType={active ? 'default' : 'secondary'}
            >
              My
            </SuperButton>
            <SuperButton
              onClick={switchAllButtonHandler}
              className={s.switch}
              xType={active ? 'secondary' : 'default'}
            >
              All
            </SuperButton>
          </div>
        </div>
        <div className={s.rangeBlock}>
          <SubTitle title="Number of cards" />
          <div className={s.range}>
            <div className={s.rangeCount}>1</div>
            <div className={s.rangeLine}>------------------------</div>
            <div className={s.rangeCount}>30</div>
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
