import { cardsAPI } from '../../api/cards -api'
import { CardsPackType, NewPackType, ParamsType, UpdatedPackType } from '../../api/typesAPI'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
  packs: [] as CardsPackType[],
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

    default:
      return state
  }
}

export const getPacksAC = (packs: CardsPackType[]) => ({ type: 'cards/GET_CARDS', packs } as const)

export const getPacksTC =
  (params?: ParamsType): AppThunk =>
  async dispatch => {
    try {
      const res = await cardsAPI.getPacks()

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
      dispatch(getPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const updatePackTC =
  (data: UpdatedPackType): AppThunk =>
  async dispatch => {
    try {
      await cardsAPI.updatedPack(data)
      dispatch(getPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      await cardsAPI.deletePack(id)
      dispatch(getPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export type ActionCardsType = ReturnType<typeof getPacksAC>
