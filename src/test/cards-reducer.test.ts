import exp from 'constants'

import { cardsReducer, InitialCardsStateType, setCards } from 'common/cards/pack/card/cards-reducer'

let startState: InitialCardsStateType

beforeEach(() => {
  startState = {
    cards: [
      {
        _id: '123456',
        cardsPack_id: '1',
        user_id: 'Patskalev',
        question: 'My name is Dima!!!',
        answer: 'What is your name?',
        grade: 5,
        shots: 1,
        questionImg: 'questionImg',
        answerImg: 'answerImg',
        answerVideo: 'answerVideo',
        questionVideo: 'questionVideo',
        comments: 'comments',
        type: 'string',
        rating: 5,
        more_id: 'Patskalev',
        created: '23/04/2023',
        updated: '24/04/2023',
        __v: 1245646,
      },
    ],
    cardsPack_id: '1',
    cardsTotalCount: 1,
    pageCard: 1,
    pageCardCount: 5,
    name: '',
    cardQuestion: '',
  }
})

test('card should be set', () => {
  const action = setCards(startState.cards)
  const endState = cardsReducer(startState, action)

  expect(endState.cards.length).toBe(1)
})

test('card should be added', () => {
  const newCard = {
    _id: '1234567',
    cardsPack_id: '1',
    user_id: 'Patskalev',
    question: 'How are you?',
    answer: 'That is Ok!',
    grade: 4,
    shots: 1,
    questionImg: 'questionImg',
    answerImg: 'answerImg',
    answerVideo: 'answerVideo',
    questionVideo: 'questionVideo',
    comments: 'comments',
    type: 'string',
    rating: 5,
    more_id: 'Patskalev',
    created: '23/04/2023',
    updated: '24/04/2023',
    __v: 1245646,
  }
  const newState = { ...startState, cards: [newCard, ...startState.cards] }
  const action = setCards(newState.cards)

  const endState = cardsReducer(startState, action)

  expect(endState.cards.length).toBe(2)
  expect(endState.cards[0].question).toBe('How are you?')
  expect(endState.cards[0].answer).toBe('That is Ok!')
  expect(endState.cards[0]._id).toBe('1234567')
})
