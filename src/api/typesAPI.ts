export type LoginParamsType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}

export type ForgotPasswordParamsType = {
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

export type ParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: number
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type NewPackType = {
  cardsPack: {
    name: string // если не отправить будет таким
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет такой
  }
}

export type UpdatedPackType = {
  cardsPack: {
    _id: string
    name: string
  }
}
