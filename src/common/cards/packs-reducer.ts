import { Dispatch } from 'redux'

import { cardsAPI } from '../../api/cards -api'
import { CardsPackType, NewPackType, UpdatedPackType } from '../../api/typesAPI'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
  packs: [] as CardsPackType[],
  page: 1,
  isDisabled: false,
}

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionCardsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/GET_CARDS': {
      return { ...state, packs: action.packs }
    }
    case 'cards/SET_PAGE_COUNT':
      return { ...state, page: action.page }

    default:
      return state
  }
}

export const getPacksAC = (packs: CardsPackType[]) => ({ type: 'cards/GET_CARDS', packs } as const)

export const setPageAC = (page: number) => ({ type: 'cards/SET_PAGE_COUNT', page } as const)

export const getMyPacksTC = (): AppThunk => async dispatch => {
  try {
    const res = await cardsAPI.getPacks({ user_id: '6352ce8810be8e0004d5b4f4' })

    dispatch(getPacksAC(res.data.cardPacks))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
}

export const getAllPackTC = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const { page } = getState().packs

  try {
    const res = await cardsAPI.getPacks({ page })

    dispatch(getPacksAC(res.data.cardPacks))
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

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      await cardsAPI.deletePack(id)
      dispatch(getMyPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export type ActionCardsType = ReturnType<typeof getPacksAC> | ReturnType<typeof setPageAC>
