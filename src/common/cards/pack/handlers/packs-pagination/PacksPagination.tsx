import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { SuperPagination } from '../../../../../components/super-components/pagination/SuperPagination'
import { setPageAC, setPageCountAC } from '../../packs-reducer'
import s from '../Handler.module.scss'

export const PacksPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const { page, pageCount, cardPacksTotalCount } = useAppSelector(state => state.packs)

  const onChangePagination = (newPage: number, newPageCount: number) => {
    dispatch(setPageAC(newPage))
    dispatch(setPageCountAC(newPageCount))
    const queryPage = newPage !== 1 ? { page: newPage + '' } : {}
    const queryCount = newPageCount !== 5 ? { pageCount: newPageCount + '' } : {}
    const { page, pageCount, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...queryPage, ...queryCount }

    setSearchParams(allQuery)
  }

  return (
    <div className={s.paginationContainer}>
      <SuperPagination
        title="Cards per Page"
        page={page}
        pageCount={pageCount}
        cardPacksTotalCount={cardPacksTotalCount}
        onChange={onChangePagination}
      />
    </div>
  )
}
