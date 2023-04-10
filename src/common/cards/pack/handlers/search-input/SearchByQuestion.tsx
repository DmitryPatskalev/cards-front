import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { fetchCardsTC, setSearchByQuestionAC } from '../../card/cards-reducer'

import { SearchInput } from './SearchInput'

export const SearchByQuestion = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const { cardQuestion, cardsPack_id } = useAppSelector(state => state.cards)

  const onChangeText = (newQuestion: string) => {
    dispatch(setSearchByQuestionAC(newQuestion))
    const querySearch = newQuestion !== '' ? { cardQuestion: newQuestion + '' } : {}
    const { cardQuestion, ...lastQueries } = Object.fromEntries(searchParams)
    const allQuery: any = { ...lastQueries, ...querySearch }

    setSearchParams(allQuery)
  }

  const querySearch = () => {
    dispatch(fetchCardsTC(cardsPack_id))
  }

  return (
    <div>
      <SearchInput onChangeText={onChangeText} querySearch={querySearch} value={cardQuestion} />
    </div>
  )
}
