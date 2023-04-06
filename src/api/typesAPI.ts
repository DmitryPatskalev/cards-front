//auth

export type LoginType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}

export type ForgotPasswordType = {
  email: string // кому восстанавливать пароль
  from?: string
  message: string
}

export type NewPasswordType = {
  info: string
  error: string
}

export type UserParamsType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}

export type LogoutType = {
  error: string
  in: string
}

export type UpdateUserType = {
  updatedUser: UserParamsType
  token: string
  tokenDeathTime: number
}

//packs
export type CardsPackDomainType = {
  cardPacks: CardsPackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type CardsPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type NewPackType = {
  cardsPack: {
    name: string // если не отправить будет таким
    deckCover?: string // не обязателен
    //private?: boolean // если не отправить будет такой
  }
}

export type UpdatedPackType = {
  cardsPack: {
    _id: string
    name: string
  }
}

//cards

export type CardsParamsType = {
  cardAnswer: string // не обязательно
  cardQuestion: string // не обязательно
  cardsPack_id: string
  min: number // не обязательно
  max: number // не обязательно
  sortCards: string // не обязательно
  page: number // не обязательно
  pageCount: number // не обязательно
}

export type CreatePacksType = {
  card: {
    cardsPack_id: string
    question: string // если не отправить будет таким
    answer: string // если не отправить будет таким
    grade: number // 0..5, не обязателен
    shots: number // не обязателен
    answerImg: string // не обязателен
    questionImg: string // не обязателен
    questionVideo: string // не обязателен
    answerVideo: string // не обязателен
  }
}

export type UpdatePacksType = {
  card: {
    _id: string
    question: string // не обязательно
  }
}

export type CardsDomainType = {
  cards: any[]
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
