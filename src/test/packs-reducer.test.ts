import {
  getPacks,
  InitialPacksStateType,
  packsReducer,
  setPage,
  setPageCount,
} from 'common/cards/pack/packs-reducer'

let startState: InitialPacksStateType

beforeEach(() => {
  startState = {
    cardPacks: [
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
        more_id: '222',
        __v: 0,
      },
    ],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 90,
    min: 0,
    max: 110,
    packName: '',
    sortPacks: '',
    isMyPacks: false,
    isLoading: false,
  }
})

test('correct packs should be got', () => {
  const action = getPacks(startState.cardPacks)
  const endState = packsReducer(startState, action)

  expect(endState.cardPacks.length).toBe(2)
})

test('page should be set', () => {
  const action = setPage(2)
  const endState = packsReducer(startState, action)

  const length = Math.ceil(startState.cardPacksTotalCount / startState.pageCount)

  const totalCountPage = Array.from({ length }, (_, ind) => ind + 1)

  expect(endState.page).toBe(2)
  expect(totalCountPage.at(-1)).toBe(18)
})

test('page count should be corrected', () => {
  const action = setPageCount(15)
  const endState = packsReducer(startState, action)

  const length = Math.ceil(startState.cardPacksTotalCount / action.pageCount)
  const totalCountPage = Array.from({ length }, (_, ind) => ind + 1)

  expect(endState.pageCount).toBe(15)
  expect(totalCountPage.at(-1)).toBe(6)
})

test('new pack should be created', () => {
  const newPack = {
    _id: '3',
    user_id: '333',
    user_name: 'Loki, son of Odin!!!',
    private: true,
    name: 'Dima',
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
  }
  const newState = { ...startState, cardPacks: [newPack, ...startState.cardPacks] }
  const action = getPacks(newState.cardPacks)
  const endState = packsReducer(startState, action)

  expect(endState.cardPacks.length).toBe(3)
  expect(endState.cardPacks[0].name).toBe('Dima')
  expect(endState.cardPacks[0].private).toBeTruthy()
})

test('correct pack should be updated', () => {
  const newState = {
    ...startState,
    cardPacks: startState.cardPacks.map(p =>
      p._id === '1' ? { ...p, name: 'Odin', private: true } : p
    ),
  }

  const action = getPacks(newState.cardPacks)
  const endState = packsReducer(startState, action)

  expect(endState.cardPacks[0].name).toBe('Odin')
  expect(endState.cardPacks[0].private).toBeTruthy()
  expect(endState.cardPacks[1].name).toBe('Tor')
  expect(endState.cardPacks.length).toBe(2)
})

test('correct pack should be removed', () => {
  const newState = { ...startState, cardPacks: startState.cardPacks.filter(p => p._id !== '2') }

  const action = getPacks(newState.cardPacks)
  const endState = packsReducer(startState, action)

  expect(endState.cardPacks.length).toBe(1)
  expect(endState.cardPacks[0].name).toBe('Loki')
})
