import { instance } from 'api/instance'

export const cardsAPI = {
  getCards(params?: CardsParamsType) {
    return instance.get<CardsResponceType>('/cards/card', { params })
  },
  postCards(data: NewCardType) {
    return instance.post<CardDomainResponseType<CardType>>('/cards/card', data)
  },
  deleteCard(id: string) {
    return instance.delete<CardDomainResponseType<CardType>>('/cards/card', {
      params: {
        id,
      },
    })
  },
  updateCard(data: UpdateCardType) {
    return instance.put<CardDomainResponseType<CardType>>('cards/card', data)
  },
  setGradeCard(data: GradeCardType) {
    return instance.put('cards/grade', data)
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

export type CardDomainResponseType<T = {}> = {
  cards: T
  token: string
  tokenDeathTime: number
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

export type GradeCardType = {
  grade: number
  card_id: string
}

export type CardGradeResponceType = {
  updatedGrade: SetGradeType
  token: string
  tokenDeathTime: number
}
export type SetGradeType = {
  card_id: string
  user_id: string
  cardsPack_id: string
  grade: number
  shots: number
  more_id: string
  _id: string
  created: string
  updated: string
  __v: number
}

//
// export type UpdateCardResponceType = {
//   updatedCard: CardType
//   token: string
//   tokenDeathTime: number
// }
//
// export type NewCardResponceType = {
//   newCard: CardType
//   token: string
//   tokenDeathTime: number
// }
// export type DeleteCardResponseType = {
//   deletedCard: CardType
//   token: string
//   tokenDeathTime: number
// }
