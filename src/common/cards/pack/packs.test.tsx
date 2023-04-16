import React from 'react'

import { PackType } from 'api/packs-api'

let initialState = {
  packs: [] as PackType[],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
  min: 0,
  max: 110,
  packName: '',
  sortPacks: '',
  isMyPacks: false,
  isLoading: false,
}

beforeEach(() => {
  initialState = {
    packs: [
      {
        _id: '1',
        user_id: '111',
        user_name: 'Loki, son of Odin!!!',
        private: false,
        name: 'Loki',
        cardsCount: 0,
        path: '/def',
        grade: 1,
        shots: 0,
        type: 'pack',
        rating: 0,
        created: '2023-04-15T17:11:22.272Z',
        updated: '2023-04-15T17:12:33.999Z',
        more_id: '111',
        __v: 0,
      },

      {
        _id: '2',
        user_id: '222',
        user_name: 'Loki, son of Odin!!!',
        private: false,
        name: 'Tor',
        cardsCount: 0,
        path: '/def',
        grade: 1,
        shots: 0,
        type: 'pack',
        rating: 0,
        created: '2023-04-15T17:11:22.272Z',
        updated: '2023-04-15T17:12:33.999Z',
        more_id: '111',
        __v: 0,
      },
    ],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    min: 0,
    max: 110,
    packName: '',
    sortPacks: '',
    isMyPacks: false,
    isLoading: false,
  }
})

test('new pack should be added', () => {
  const newTitle = 'Odin'
  const privates = true
})
