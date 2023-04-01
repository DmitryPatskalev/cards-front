import { errorUtils } from '../../utils/error/error-utils'

import { cardsAPI } from 'api/cards -api'
import { CardsPackType, NewPackType, ParamsType, UpdatedPackType } from 'api/typesAPI'
import { AppThunk } from 'app/store'

const initialState = {
  packs: [] as CardsPackType[],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
  min: 0,
  max: 110,
  packName: '',
  user_id: '',
  isMyPacks: false,
  isDisabled: false,
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

//thunks
export const getMyPacksTC = (): AppThunk => async (dispatch, getState) => {
  const { page, pageCount, packName, min, max } = getState().packs

  try {
    const res = await cardsAPI.getPacks({
      page,
      pageCount,
      packName,
      min,
      max,
      user_id: '6352ce8810be8e0004d5b4f4',
    })

    dispatch(setIsMyPacks(true))
    dispatch(getPacksAC(res.data.cardPacks))
    dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
}

export const getPacksTC =
  (params?: ParamsType): AppThunk =>
  async (dispatch, getState) => {
    const { page, pageCount, packName, min, max } = getState().packs

    try {
      const res = await cardsAPI.getPacks({ page, pageCount, packName, min, max })

      dispatch(setIsMyPacks(false))
      dispatch(getPacksAC(res.data.cardPacks))
      dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const createNewPacksTC =
  (data: NewPackType): AppThunk =>
  async dispatch => {
    try {
      await cardsAPI.createPack(data)
      dispatch(getMyPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const updatePackTC =
  (data: UpdatedPackType): AppThunk =>
  async dispatch => {
    try {
      await cardsAPI.updatedPack(data)
      dispatch(getMyPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const deletePackTC = (): AppThunk => async dispatch => {
  try {
    await cardsAPI.deletePack()
    dispatch(getMyPacksTC())
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