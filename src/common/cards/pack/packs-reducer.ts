import { errorUtils } from '../../utils/errors/error/error-utils'

import { NewPackType, packsAPI, PackType, UpdatedPackType } from 'api/packs-api'
import { AppThunk } from 'app/store'
import { PropertiesType } from 'common/utils/ActionsTypeUtils'

const initialState = {
  cardPacks: [] as PackType[],
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

export type InitialPacksStateType = typeof initialState

export const packsReducer = (
  state: InitialPacksStateType = initialState,
  action: ActionPacksType
): InitialPacksStateType => {
  switch (action.type) {
    case 'packs/GET_PACKS':
      return { ...state, cardPacks: action.cardPacks }

    case 'packs/SET_PAGE':
      return { ...state, page: action.page }

    case 'packs/SET_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount }

    case 'packs/SET_PACK_CARDS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.cardPacksTotalCount }

    case 'packs/SET_SEARCH_BY_PACK_NAME':
      return { ...state, packName: action.packName }

    case 'packs/SET-MIN-CARDS-COUNT':
      return { ...state, min: action.minCount }

    case 'packs/SET-MAX-CARDS-COUNT':
      return { ...state, max: action.maxCount }

    case 'packs/SET_IS_MY_PACKS':
      return { ...state, isMyPacks: action.isMyPacks }

    case 'packs/SET_IS_LOADING':
      return { ...state, isLoading: action.isLoading }

    case 'packs/SET_SORT_PACKS':
      return { ...state, sortPacks: action.sortPacks }

    default:
      return state
  }
}

const packsActions = {
  getPacks: (cardPacks: PackType[]) => ({ type: 'packs/GET_PACKS', cardPacks } as const),

  setPage: (page: number) => ({ type: 'packs/SET_PAGE', page } as const),

  setPageCount: (pageCount: number) => ({ type: 'packs/SET_PAGE_COUNT', pageCount } as const),

  setCardPacksTotalCount: (cardPacksTotalCount: number) =>
    ({ type: 'packs/SET_PACK_CARDS_TOTAL_COUNT', cardPacksTotalCount } as const),

  setSearchByPackName: (packName: string) =>
    ({ type: 'packs/SET_SEARCH_BY_PACK_NAME', packName } as const),

  setMinCardsCount: (minCount: number) =>
    ({ type: 'packs/SET-MIN-CARDS-COUNT', minCount } as const),

  setMaxCardsCount: (maxCount: number) =>
    ({ type: 'packs/SET-MAX-CARDS-COUNT', maxCount } as const),

  setIsMyPacks: (isMyPacks: boolean) => ({ type: 'packs/SET_IS_MY_PACKS', isMyPacks } as const),

  setIsLoading: (isLoading: boolean) => ({ type: 'packs/SET_IS_LOADING', isLoading } as const),

  setSortPacks: (sortPacks: string) => ({ type: 'packs/SET_SORT_PACKS', sortPacks } as const),
}

//thunks

export const fetchPacksTC = (): AppThunk => async (dispatch, getState) => {
  const { page, pageCount, packName, min, max, isMyPacks, sortPacks } = getState().packs
  const { _id } = getState().auth

  try {
    dispatch(setIsLoading(true))
    const res = await packsAPI.getPacks({
      page,
      pageCount,
      packName,
      min,
      max,
      sortPacks,
      user_id: isMyPacks ? _id : '',
    })

    dispatch(getPacks(res.data.cardPacks))
    dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
  } catch (error) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const createNewPacksTC =
  (data: NewPackType): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.createPack(data)

      dispatch(fetchPacksTC())
    } catch (error) {
      errorUtils(error, dispatch)
    }
  }

export const updatePackTC =
  (data: UpdatedPackType): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.updatedPack(data)

      dispatch(fetchPacksTC())
    } catch (error) {
      errorUtils(error, dispatch)
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      await packsAPI.deletePack(id)

      dispatch(fetchPacksTC())
    } catch (error) {
      errorUtils(error, dispatch)
    }
  }

export type ActionPacksType = ReturnType<PropertiesType<typeof packsActions>>

export const {
  setSortPacks,
  setIsMyPacks,
  setCardPacksTotalCount,
  setMaxCardsCount,
  setMinCardsCount,
  setPageCount,
  setPage,
  setSearchByPackName,
  getPacks,
  setIsLoading,
} = packsActions
