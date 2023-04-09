import { errorUtils } from '../../utils/errors/error/error-utils'

import { NewPackType, packsAPI, PackType, UpdatedPackType } from 'api/packs-api'
import { AppThunk } from 'app/store'
import { setIsDisabledAC } from 'common/auth/login/login-reducer'

const initialState = {
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

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionPacksType
): InitialStateType => {
  switch (action.type) {
    case 'cards/GET_PACKS':
      return { ...state, packs: action.packs }

    case 'cards/SET_PAGE':
      return { ...state, page: action.page }

    case 'cards/SET_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount }

    case 'cards/SET_PACK_CARDS_TOTAL_COUNT':
      return { ...state, cardPacksTotalCount: action.cardPacksTotalCount }

    case 'cards/SET_SEARCH':
      return { ...state, packName: action.packName }

    case 'cards/SET-MIN-CARDS-COUNT':
      return { ...state, min: action.minCount }

    case 'cards/SET-MAX-CARDS-COUNT':
      return { ...state, max: action.maxCount }

    case 'cards/SET_IS_MY_PACKS':
      return { ...state, isMyPacks: action.isMyPacks }

    case 'cards/SET_IS_LOADING':
      return { ...state, isLoading: action.isLoading }

    case 'cards/SET_SORT_PACKS':
      return { ...state, sortPacks: action.sortPacks }

    default:
      return state
  }
}

export const getPacksAC = (packs: PackType[]) => ({ type: 'cards/GET_PACKS', packs } as const)

export const setPageAC = (page: number) => ({ type: 'cards/SET_PAGE', page } as const)

export const setPageCountAC = (pageCount: number) =>
  ({ type: 'cards/SET_PAGE_COUNT', pageCount } as const)

export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({ type: 'cards/SET_PACK_CARDS_TOTAL_COUNT', cardPacksTotalCount } as const)

export const setSearchPacksAC = (packName: string) =>
  ({ type: 'cards/SET_SEARCH', packName } as const)

export const setMinCardsCountAC = (minCount: number) =>
  ({ type: 'cards/SET-MIN-CARDS-COUNT', minCount } as const)

export const setMaxCardsCountAC = (maxCount: number) =>
  ({ type: 'cards/SET-MAX-CARDS-COUNT', maxCount } as const)

export const setIsMyPacks = (isMyPacks: boolean) =>
  ({ type: 'cards/SET_IS_MY_PACKS', isMyPacks } as const)

export const setIsLoadingAC = (isLoading: boolean) =>
  ({ type: 'cards/SET_IS_LOADING', isLoading } as const)

export const setSortPacksAC = (sortPacks: string) =>
  ({ type: 'cards/SET_SORT_PACKS', sortPacks } as const)

//thunks

export const fetchPacksTC = (): AppThunk => async (dispatch, getState) => {
  const { page, pageCount, packName, min, max, isMyPacks, sortPacks } = getState().packs
  const { _id } = getState().auth

  try {
    dispatch(setIsLoadingAC(true))
    const res = await packsAPI.getPacks({
      page,
      pageCount,
      packName,
      min,
      max,
      sortPacks,
      user_id: isMyPacks ? _id : '',
    })

    dispatch(getPacksAC(res.data.cardPacks))
    dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
  } catch (error) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setIsLoadingAC(false))
  }
}

export const createNewPacksTC =
  (data: NewPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsDisabledAC(true))
      dispatch(setIsLoadingAC(true))
      await packsAPI.createPack(data)
      dispatch(fetchPacksTC())
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
      dispatch(setIsLoadingAC(false))
    }
  }

export const updatePackTC =
  (data: UpdatedPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsLoadingAC(true))
      await packsAPI.updatedPack(data)
      dispatch(fetchPacksTC())
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoadingAC(false))
    }
  }

export const deletePackTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsLoadingAC(true))
    await packsAPI.deletePack()
    dispatch(fetchPacksTC())
  } catch (error) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setIsLoadingAC(false))
  }
}

export type ActionPacksType =
  | ReturnType<typeof getPacksAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCardPacksTotalCountAC>
  | ReturnType<typeof setSearchPacksAC>
  | ReturnType<typeof setMinCardsCountAC>
  | ReturnType<typeof setMaxCardsCountAC>
  | ReturnType<typeof setIsMyPacks>
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setSortPacksAC>
