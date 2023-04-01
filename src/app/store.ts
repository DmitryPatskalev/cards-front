import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ActionsAppType, appReducer } from './app-reducer'

import { ActionCardsType, packsReducer } from 'common/cards/pack/packs-reducer'
import { ActionsAuthType, loginReducer } from 'common/login/login-reducer'

export const rootReducer = combineReducers({
  auth: loginReducer,
  app: appReducer,
  packs: packsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof store.getState>
export type ActionsType = ActionsAuthType | ActionsAppType | ActionCardsType
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

// @ts-ignore
window.store = store
