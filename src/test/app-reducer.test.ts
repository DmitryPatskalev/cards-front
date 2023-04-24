import { appReducer, InitialAppStateType, setIsInitialized, setStatus } from 'app/app-reducer'

let startState: InitialAppStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    isInitialized: false,
  }
})

test('status should be changed', () => {
  const action = setStatus('loading')
  const endState = appReducer(startState, action)

  expect(endState.status).toBe('loading')
})

test('user should be initialized', () => {
  const action = setIsInitialized(true)
  const endState = appReducer(startState, action)

  expect(endState.isInitialized).toBeTruthy()
})
