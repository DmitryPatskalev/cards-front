import { instance } from 'api/instance'

export const packsAPI = {
  getPacks(params?: PacksParamsType) {
    return instance.get<PackResponseType>('/cards/pack', { params })
  },
  createPack(data: PackDomainType<NewPackType>) {
    return instance.post<PackResponseType>('/cards/pack', data)
  },
  updatedPack(data: PackDomainType<UpdatedPackType>) {
    return instance.put<PackResponseType>('/cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete<PackResponseType>('/cards/pack', {
      params: {
        id,
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

export type PackDomainType<T = {}> = {
  cardsPack: T
}

export type NewPackType = {
  name: string // если не отправить будет таким
  private?: boolean // если не отправить будет такой
}

export type UpdatedPackType = {
  _id: string
  name: string
  private?: boolean
}
