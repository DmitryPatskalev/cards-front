import React from 'react'

import s from './SearchInput.module.scss'

import { SubTitle } from 'common/utils/SubTitle/SubTitle'
import { SuperDebounceInput } from 'components/super-components/debounce/SuperDebounceInput'

type SearchInputTypeProps = {
  onChangeText: (newPackName: string) => void
  querySearch: () => void
  value: string
}

export const SearchInput: React.FC<SearchInputTypeProps> = ({
  onChangeText,
  querySearch,
  value,
}) => {
  return (
    <div className={s.searchBlock}>
      <SubTitle title="Search" />
      <SuperDebounceInput
        onChangeText={onChangeText}
        onDebounceChange={querySearch}
        value={value}
        className={s.searchInput}
        type="text"
        placeholder="Provide your text"
      />
    </div>
  )
}
