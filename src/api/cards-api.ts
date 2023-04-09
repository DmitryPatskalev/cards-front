import { instance } from 'api/instance'

export const cardsAPI = {
  getCards(params?: CardsParamsType) {
    return instance.get<CardsResponceType>('/cards/card', { params })
  },
  postCards(data: NewCardType) {
    return instance.post<CardsResponceType>('/cards/card', data)
  },
  deleteCard() {
    return instance.delete('/cards/card', {
      params: {
        id: '6432d7c233c3ea8b4e684c90',
      },
    })
  },
  updateCard(data: UpdateCardType) {
    return instance.put('cards/card', data)
  },
}

export type CardsParamsType = {
  cardAnswer?: string // не обязательно
  cardQuestion?: string // не обязательно
  cardsPack_id?: string
  min?: number // не обязательно
  max?: number // не обязательно
  sortCards?: string // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
}

export type CardsResponceType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  question: string
  answer: string
  grade: number
  shots: number
  questionImg: string
  answerImg: string
  answerVideo: string
  questionVideo: string
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type NewCardType = {
  card: {
    cardsPack_id?: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
  }
}

export type UpdateCardType = {
  card: {
    _id: string
    answer?: string
    question?: string // не обязательно
  }
}
