import React, { useEffect } from 'react'

import { getPacksTC } from '../packs-reducer'

import { Buttons } from './Buttons'
import { RemoveQueryParams } from './clear-filters/RemoveQueryParams'
import s from './Handler.module.scss'
import { PacksPagination } from './packs-pagination/PacksPagination'
import { SearchInput } from './search-input/SearchInput'
import { Slider } from './slider/Slider'

import { useAppDispatch, useAppSelector } from 'app/store'

export const Handlers = () => {
  const dispatch = useAppDispatch()

  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { page, pageCount, min, max, isMyPacks, sortPacks } = useAppSelector(state => state.packs)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPacksTC())
    }
  }, [page, pageCount, min, max, isMyPacks, sortPacks])

  return (
    <>
      <div className={s.handlersContainer}>
        <SearchInput />
        <Buttons />
        <Slider />
        <RemoveQueryParams />
      </div>
      <PacksPagination />
    </>
  )
}
