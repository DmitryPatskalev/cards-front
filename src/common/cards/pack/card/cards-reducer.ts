import { cardsAPI, CardType, NewCardType, UpdateCardType } from 'api/cards-api'
import { AppThunk } from 'app/store'
import { setIsDisabledAC } from 'common/auth/login/login-reducer'
import { setIsLoadingAC } from 'common/cards/pack/packs-reducer'
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

type InitialStateType = typeof initialState

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: ActionsCardsType
): InitialStateType => {
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
    default:
      return state
  }
}

export const setCardsAC = (cards: CardType[]) => ({ type: 'cards/GET_CARDS', cards } as const)

export const setCardsPackIdAC = (cardsPack_id: string) =>
  ({ type: 'cards/SET_PACK_USER_ID', cardsPack_id } as const)

export const createNewCardAC = (card: CardType) =>
  ({ type: 'cards/CREATE_NEW_CARD', card } as const)

export const setCardsTotalCountAC = (cardsTotalCount: number) =>
  ({ type: 'cards/SET_CARDS_TOTAL_COUNT', cardsTotalCount } as const)

export const setPackNameAC = (name: string) => ({ type: 'cards/SET_PACK_NAME', name } as const)

export const setSearchByQuestionAC = (cardQuestion: string) =>
  ({ type: 'cards/SET_SEARCH_BY_QUESTION', cardQuestion } as const)

export const setPageCardAC = (pageCard: number) =>
  ({ type: 'cards/SET_PAGE_CARD', pageCard } as const)

export const setPageCardCountAC = (pageCardCount: number) =>
  ({ type: 'cards/SET_PAGE_CARD_COUNT', pageCardCount } as const)

export const fetchCardsTC =
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    const { cardQuestion, pageCard, pageCardCount } = getState().cards

    try {
      dispatch(setIsLoadingAC(true))

      const res = await cardsAPI.getCards({
        cardsPack_id,
        page: pageCard,
        pageCount: pageCardCount,
        cardQuestion,
      })

      dispatch(setCardsAC(res.data.cards))
      dispatch(setCardsPackIdAC(cardsPack_id))
      dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
      dispatch(setPackNameAC(res.data.packName))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoadingAC(false))
    }
  }

export const createNewCardTC =
  (data: NewCardType): AppThunk =>
  async (dispatch, getState) => {
    const { cardsPack_id } = getState().cards

    try {
      dispatch(setIsDisabledAC(true))
      dispatch(setIsLoadingAC(true))
      await cardsAPI.postCards(data)

      dispatch(fetchCardsTC(cardsPack_id))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsDisabledAC(false))
      dispatch(setIsLoadingAC(false))
    }
  }

export const deleteCardTC = (): AppThunk => async (dispatch, getState) => {
  const { cardsPack_id } = getState().cards

  try {
    dispatch(setIsLoadingAC(true))
    await cardsAPI.deleteCard()
    dispatch(fetchCardsTC(cardsPack_id))
  } catch (error) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setIsLoadingAC(false))
  }
}

export const updateCardTC =
  (data: UpdateCardType): AppThunk =>
  async (dispatch, getState) => {
    const { cardsPack_id } = getState().cards

    try {
      dispatch(setIsLoadingAC(true))
      await cardsAPI.updateCard(data)
      dispatch(fetchCardsTC(cardsPack_id))
    } catch (error) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setIsLoadingAC(false))
    }
  }

export type ActionsCardsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCardsPackIdAC>
  | ReturnType<typeof createNewCardAC>
  | ReturnType<typeof setCardsTotalCountAC>
  | ReturnType<typeof setPackNameAC>
  | ReturnType<typeof setSearchByQuestionAC>
  | ReturnType<typeof setPageCardAC>
  | ReturnType<typeof setPageCardCountAC>
