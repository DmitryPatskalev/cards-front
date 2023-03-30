import React, { ChangeEvent } from 'react'

import { Pagination } from '@mui/material'

import { SuperSelect } from '../select/SuperSelect'

import s from './SuperPagination.module.scss'

type SuperPaginationPropsType = {
  page: number
  pageCount: number
  cardPacksTotalCount: number
  onChange: (page: number, count: number) => void
}
export const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  pageCount,
  cardPacksTotalCount,
  onChange,
}) => {
  const lastPage = Math.ceil(cardPacksTotalCount / pageCount)

  const onChangeCallBack = (event: any, page: number) => {
    onChange(page, pageCount)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(page, +event.currentTarget.value)
  }
  const numbers = [
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 15 },
    { id: 4, value: 20 },
    { id: 5, value: 25 },
    { id: 6, value: 30 },
    { id: 7, value: 50 },
  ]

  return (
    <div className={s.pagination}>
      <Pagination page={page} count={lastPage} onChange={onChangeCallBack} />

      <span className={s.text1}>Show</span>

      <SuperSelect
        value={pageCount}
        options={numbers}
        onChange={onChangeSelect}
        className={s.select}
      />

      <span className={s.text2}>Cards per Page</span>
    </div>
  )
}
