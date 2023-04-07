import { cardsAPI } from '../../../../api/packs-api'
import { CardsDomainType, CardsParamsType, CardType } from '../../../../api/typesAPI'
import { AppThunk, store } from '../../../../app/store'

const initialState = {
  cards: [] as CardType[],
  cardsPack_id: '',
}

type InitialStateType = typeof initialState

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: ActionsCardsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/GET_CARDS':
      return { ...state, [action.cardsPack_id]: action.cards }
    default:
      return state
  }
}

export const setCardsAC = (cardsPack_id: string, cards: CardType[]) =>
  ({ type: 'cards/GET_CARDS', cardsPack_id, cards } as const)

export const getCardsTC = (): AppThunk => async (dispatch, getState) => {
  const { cardsPack_id, cards } = getState().cards

  try {
    const res = cardsAPI.getCards({ cardsPack_id })

    console.log(res)
    console.log(cards)
    // dispatch(setCardsAC(cardsPack_id, res))
  } catch (e) {
    console.log(e)
  }
}

export type ActionsCardsType = ReturnType<typeof setCardsAC>
