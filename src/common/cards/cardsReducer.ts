import { cardsAPI } from '../../api/cards -api'
import { CardsPackType, NewCardsType, ParamsType } from '../../api/typesAPI'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../utils/error/error-utils'

const initialState = {
  card: [] as CardsPackType[],
}

type InitialStateType = typeof initialState

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: ActionCardsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/GET_CARDS': {
      return { ...state, card: action.card }
    }

    case 'cards/CREATE_CARDS':
      return {
        ...state,
        card: state.card.map(elem => {
          return {
            ...elem,
            name: action.data.cardsPack.name,
            private: action.data.cardsPack.private,
          }
        }),
      }
    default:
      return state
  }
}

export const getCardsAC = (card: CardsPackType[]) => ({ type: 'cards/GET_CARDS', card } as const)
export const createNewCardAC = (data: NewCardsType) =>
  ({ type: 'cards/CREATE_CARDS', data } as const)

export const getCardsTC =
  (params?: ParamsType): AppThunk =>
  async dispatch => {
    try {
      const res = await cardsAPI.getCards(params)

      dispatch(getCardsAC(res.data.cardPacks))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const createNewCardTC =
  (data: NewCardsType): AppThunk =>
  async dispatch => {
    try {
      const res = await cardsAPI.createCards(data)

      dispatch(createNewCardAC(data))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export type ActionCardsType = ReturnType<typeof getCardsAC> | ReturnType<typeof createNewCardAC>
