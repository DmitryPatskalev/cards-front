import React, { ChangeEvent } from 'react'

import { Pagination } from '@mui/material'

import s from 'components/super-components/pagination/SuperPagination.module.scss'
import { SuperSelect } from 'components/super-components/select/SuperSelect'

type SuperPaginationPropsType = {
  title: string
  page: number
  pageCount: number
  cardPacksTotalCount: number
  onChange: (page: number, count: number) => void
}
export const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  title,
  page,
  pageCount,
  cardPacksTotalCount,
  onChange,
}) => {
  const lastPage = Math.ceil(cardPacksTotalCount / pageCount)

  const onChangeCallBack = (event: ChangeEvent<unknown>, page: number) => {
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
      <Pagination
        shape={'rounded'}
        color={'primary'}
        page={page}
        count={lastPage}
        onChange={onChangeCallBack}
      />

      <span className={s.text1}>Show</span>

      <SuperSelect
        value={pageCount}
        options={numbers}
        onChange={onChangeSelect}
        className={s.select}
      />

      <span className={s.text2}>{title}</span>
    </div>
  )
}
