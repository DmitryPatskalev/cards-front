import React from 'react'

import { useParams, useSearchParams } from 'react-router-dom'

import { setPageAC, setPageCountAC } from '../../packs-reducer'
import s from '../Handler.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SuperPagination } from 'components/super-components/pagination/SuperPagination'

export const PacksCardsPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const { page, pageCount, cardPacksTotalCount } = useAppSelector(state => state.packs)
  const { cardsTotalCount } = useAppSelector(state => state.cards)
  const { cardsPack_id } = useParams()

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
        cardPacksTotalCount={cardsPack_id ? cardsTotalCount : cardPacksTotalCount}
        onChange={onChangePagination}
      />
    </div>
  )
}
