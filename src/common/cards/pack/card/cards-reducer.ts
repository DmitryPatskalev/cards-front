import { cardsAPI, CardType, GradeCardType, NewCardType, UpdateCardType } from 'api/cards-api'
import { AppThunk } from 'app/store'
import { setIsDisabled } from 'common/auth/login/login-reducer'
import { setIsLoading } from 'common/cards/pack/packs-reducer'
import { PropertiesType } from 'common/utils/ActionsTypeUtils'
import { errorUtils } from 'common/utils/errors/error/error-utils'

const initialState = {
  cards: [] as CardType[],
  cardsPack_id: '',
  cardsTotalCount: 0,
  pageCard: 1,
  pageCardCount: 5,
  name: '',
  cardQuestion: '',
}

export type InitialCardsStateType = typeof initialState

export const cardsReducer = (
  state: InitialCardsStateType = initialState,
  action: CardsActionsType
): InitialCardsStateType => {
  switch (action.type) {
    case 'cards/GET_CARDS':
      return { ...state, cards: action.cards }

    case 'cards/SET_PACK_USER_ID':
      return { ...state, cardsPack_id: action.cardsPack_id }

    case 'cards/SET_CARDS_TOTAL_COUNT':
      return { ...state, cardsTotalCount: action.cardsTotalCount }

    case 'cards/SET_PACK_NAME':
      return { ...state, name: action.name }

    case 'cards/SET_SEARCH_BY_QUESTION':
      return { ...state, cardQuestion: action.cardQuestion }

    case 'cards/SET_PAGE_CARD':
      return { ...state, pageCard: action.pageCard }

    case 'cards/SET_PAGE_CARD_COUNT':
      return { ...state, pageCardCount: action.pageCardCount }

    case 'cards/SET_GRADE':
      return {
        ...state,
        cards: state.cards.map(card =>
          card._id === action.card._id ? { ...card, grade: action.card.grade } : card
        ),
      }

    default:
      return state
  }
}
const cardsActions = {
  setCards: (cards: CardType[]) => ({ type: 'cards/GET_CARDS', cards } as const),

  setCardsPackId: (cardsPack_id: string) =>
    ({ type: 'cards/SET_PACK_USER_ID', cardsPack_id } as const),

  setCardsTotalCount: (cardsTotalCount: number) =>
    ({ type: 'cards/SET_CARDS_TOTAL_COUNT', cardsTotalCount } as const),

  setPackName: (name: string) => ({ type: 'cards/SET_PACK_NAME', name } as const),

  setSearchByQuestion: (cardQuestion: string) =>
    ({ type: 'cards/SET_SEARCH_BY_QUESTION', cardQuestion } as const),

  setPageCard: (pageCard: number) => ({ type: 'cards/SET_PAGE_CARD', pageCard } as const),

  setPageCardCount: (pageCardCount: number) =>
    ({ type: 'cards/SET_PAGE_CARD_COUNT', pageCardCount } as const),

  setGrade: (card: CardType) => ({ type: 'cards/SET_GRADE', card } as const),
}

//thunks
export const fetchCardsTC =
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    const { cardQuestion, pageCard, pageCardCount } = getState().cards

    try {
      dispatch(setIsLoading(true))

      const res = await cardsAPI.getCards({
        cardsPack_id,
        page: pageCard,
        pageCount: pageCardCount,
        cardQuestion,
      })

      dispatch(setCards(res.data.cards))
      dispatch(setCardsPackId(cardsPack_id))
      dispatch(setCardsTotalCount(res.data.cardsTotalCount))
      dispatch(setPackName(res.data.packName))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const createNewCardTC =
  (data: NewCardType): AppThunk =>
  async (dispatch, getState) => {
    const { cardsPack_id } = getState().cards

    try {
      dispatch(setIsDisabled(true))
      dispatch(setIsLoading(true))
      await cardsAPI.postCards(data)

      dispatch(fetchCardsTC(cardsPack_id))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabled(false))
      dispatch(setIsLoading(false))
    }
  }

export const deleteCardTC =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { cardsPack_id } = getState().cards

    try {
      dispatch(setIsLoading(true))
      await cardsAPI.deleteCard(id)
      dispatch(fetchCardsTC(cardsPack_id))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const updateCardTC =
  (data: UpdateCardType): AppThunk =>
  async (dispatch, getState) => {
    const { cardsPack_id } = getState().cards

    try {
      dispatch(setIsLoading(true))
      await cardsAPI.updateCard(data)
      dispatch(fetchCardsTC(cardsPack_id))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const setGradeTC =
  (data: GradeCardType): AppThunk =>
  async dispatch => {
    try {
      const res = await cardsAPI.setGradeCard(data)

      console.log(res.data)

      dispatch(setGrade(res.data.cards))
    } catch (error) {
      errorUtils(error, dispatch)
    }
  }

export type CardsActionsType = ReturnType<PropertiesType<typeof cardsActions>>

export const {
  setCards,
  setCardsPackId,
  setCardsTotalCount,
  setPageCardCount,
  setPageCard,
  setPackName,
  setSearchByQuestion,
  setGrade,
} = cardsActions
