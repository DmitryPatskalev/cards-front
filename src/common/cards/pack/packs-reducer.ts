import { updateUserNameAC } from '../../auth/login/login-reducer'
import { errorUtils } from '../../utils/errors/error/error-utils'

import { packsApi } from 'api/packs-api'
import { CardsPackType, NewPackType, UpdatedPackType } from 'api/typesAPI'
import { AppThunk } from 'app/store'

const initialState = {
  packs: [] as CardsPackType[],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
  min: 0,
  max: 110,
  packName: '',
  isMyPacks: false,
  isLoading: false,
}

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionCardsType
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

    default:
      return state
  }
}

export const getPacksAC = (packs: CardsPackType[]) => ({ type: 'cards/GET_PACKS', packs } as const)

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

//thunks

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
  const { page, pageCount, packName, min, max, isMyPacks } = getState().packs
  const { user_id } = getState().auth

  try {
    dispatch(setIsLoadingAC(true))
    const res = await packsApi.getPacks({
      page,
      pageCount,
      packName,
      min,
      max,
      user_id: isMyPacks ? user_id : '',
    })

    dispatch(getPacksAC(res.data.cardPacks))
    dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
    dispatch(setIsLoadingAC(false))
  } catch (e: any) {
    errorUtils(e, dispatch)
  } finally {
    dispatch(setIsLoadingAC(false))
  }
}

export const createNewPacksTC =
  (data: NewPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsLoadingAC(true))
      await packsApi.createPack(data)
      dispatch(setIsLoadingAC(false))
      dispatch(getPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const updatePackTC =
  (data: UpdatedPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsLoadingAC(true))
      await packsApi.updatedPack(data)
      dispatch(setIsLoadingAC(false))
      dispatch(getPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const deletePackTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsLoadingAC(true))
    await packsApi.deletePack()
    dispatch(setIsLoadingAC(false))
    dispatch(getPacksTC())
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
}

export type ActionCardsType =
  | ReturnType<typeof getPacksAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCardPacksTotalCountAC>
  | ReturnType<typeof setSearchPacksAC>
  | ReturnType<typeof setMinCardsCountAC>
  | ReturnType<typeof setMaxCardsCountAC>
  | ReturnType<typeof setIsMyPacks>
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof updateUserNameAC>
