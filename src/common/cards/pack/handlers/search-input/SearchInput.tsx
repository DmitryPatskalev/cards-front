import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { SuperDebounceInput } from '../../../../../components/super-components/debounce/SuperDebounceInput'
import { SubTitle } from '../../../../utils/SubTitle/SubTitle'
import { getPacksTC, setSearchPacksAC } from '../../packs-reducer'

import s from './SearchInput.module.scss'

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const { packName } = useAppSelector(state => state.packs)

  const onChangeText = (newPackName: string) => {
    dispatch(setSearchPacksAC(newPackName))
    const querySearch = newPackName !== '' ? { packName: newPackName + '' } : {}
    const { packName, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...querySearch }

    setSearchParams(allQuery)
  }

  const querySearch = () => {
    dispatch(getPacksTC())
  }

  return (
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
  )
}
