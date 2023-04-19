import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { fetchPacksTC, setSearchByPackName } from '../../packs-reducer'

import { SearchInput } from './SearchInput'

import { useAppDispatch, useAppSelector } from 'app/store'

export const SearchByPackName = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const { packName } = useAppSelector(state => state.packs)

  const onChangeText = (newPackName: string) => {
    dispatch(setSearchByPackName(newPackName))
    const querySearch = newPackName !== '' ? { packName: newPackName + '' } : {}
    const { packName, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...querySearch }

    setSearchParams(allQuery)
  }

  const querySearch = () => {
    dispatch(fetchPacksTC())
  }

  return (
    <div>
      <SearchInput onChangeText={onChangeText} querySearch={querySearch} value={packName} />
    </div>
  )
}
