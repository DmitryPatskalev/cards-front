import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from 'app/store'
import { setSortPacksAC } from 'common/cards/pack/packs-reducer'
import { SuperSort } from 'components/super-components/sort/SuperSort'

type SortPacksPropsType = {
  sort: string
  value: string
}

export const SortPacks: React.FC<SortPacksPropsType> = ({ sort, value }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const onChangeSort = (newSort: string) => {
    dispatch(setSortPacksAC(newSort))

    const querySort = newSort !== '' ? { sortPacks: newSort } : {}
    const { sortPacks, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...querySort }

    setSearchParams(allQuery)
  }

  return (
    <div>
      <SuperSort sort={sort} value={value} onChange={onChangeSort} />
    </div>
  )
}
