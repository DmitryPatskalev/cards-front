import { instance } from 'api/instance'

export const packsAPI = {
  getPacks(params?: PacksParamsType) {
    return instance.get<PackResponseType>('/cards/pack', { params })
  },
  createPack(data: NewPackType) {
    return instance.post<PackResponseType>('/cards/pack', data)
  },
  updatedPack(data: UpdatedPackType) {
    return instance.put<PackResponseType>('/cards/pack', data)
  },
  deletePack() {
    return instance.delete<PackResponseType>('/cards/pack', {
      params: {
        id: '643424baf244cf561093e819',
      },
    })
  },
}

export type PackResponseType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type PackType = {
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
