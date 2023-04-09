import React, { useEffect } from 'react'

import { fetchPacksTC } from '../packs-reducer'

import { RemoveQueryParams } from './clear-filters/RemoveQueryParams'
import s from './Handler.module.scss'
import { SearchInput } from './search-input/SearchInput'
import { Slider } from './slider/Slider'

import { useAppDispatch, useAppSelector } from 'app/store'
import { Buttons } from 'common/cards/pack/handlers/buttons/Buttons'
import { PacksCardsPagination } from 'common/cards/pack/handlers/packs-pagination/PacksCardsPagination'

export const Handlers = () => {
  const dispatch = useAppDispatch()

  const { isLoggedIn } = useAppSelector(state => state.auth)
  const { page, pageCount, min, max, isMyPacks, sortPacks } = useAppSelector(state => state.packs)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPacksTC())
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
      <PacksCardsPagination />
    </>
  )
}
