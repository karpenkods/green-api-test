import chatReducer, {
  apiTokenInstanceReducer,
  chatIdReducer,
  idInstanceReducer,
  messagesHasReducer,
  usernameReducer,
} from '../../../../common/redux/slices/chatSlice'

describe('chatSlice', () => {
  it('returns initial state for unknown action', () => {
    const state = chatReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      chatId: '',
      username: '',
      idInstance: '',
      apiTokenInstance: '',
      messagesHas: [],
    })
  })

  it('updates chat fields via reducers', () => {
    let state = chatReducer(undefined, chatIdReducer('12345@c.us'))
    state = chatReducer(state, usernameReducer('@john'))
    state = chatReducer(state, idInstanceReducer('110011'))
    state = chatReducer(state, apiTokenInstanceReducer('token-value'))

    expect(state.chatId).toBe('12345@c.us')
    expect(state.username).toBe('@john')
    expect(state.idInstance).toBe('110011')
    expect(state.apiTokenInstance).toBe('token-value')
  })

  it('sets message list via messagesHasReducer', () => {
    const payload = [
      {
        type: 'outgoing',
        textMessage: 'hello',
        time: Date.now(),
      },
    ]

    const state = chatReducer(undefined, messagesHasReducer(payload))

    expect(state.messagesHas).toEqual(payload)
  })
})
