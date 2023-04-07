import { cardsAPI, CardType } from 'api/cards-api'
import { AppThunk } from 'app/store'
import { errorUtils } from 'common/utils/errors/error/error-utils'

const initialState = {
  cards: [] as CardType[],
  cardsPack_id: '642aa7d2a915a156406e9c76',
}

type InitialStateType = typeof initialState

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: ActionsCardsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/GET_CARDS':
      return { ...state, cards: action.cards }

    default:
      return state
  }
}

export const setCardsAC = (cards: CardType[]) => ({ type: 'cards/GET_CARDS', cards } as const)

export const fetchCardsTC = (): AppThunk => async (dispatch, getState) => {
  const { cardsPack_id } = getState().cards

  try {
    const res = cardsAPI.getCards({ cardsPack_id })

    //dispatch(setCardsAC(packId))
    console.log(res)
  } catch (error) {
    errorUtils(error, dispatch)
  }
}

export type ActionsCardsType = ReturnType<typeof setCardsAC>
