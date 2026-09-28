import { createSlice } from '@reduxjs/toolkit'

import { IChatState } from '../../models'

const initialState: IChatState = {
  chatId: '',
  username: '',
  idInstance: '',
  apiTokenInstance: '',
  messagesHas: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatIdReducer(state, action) {
      state.chatId = action.payload
    },
    usernameReducer(state, action) {
      state.username = action.payload
    },
    idInstanceReducer(state, action) {
      state.idInstance = action.payload
    },
    apiTokenInstanceReducer(state, action) {
      state.apiTokenInstance = action.payload
    },
    messagesHasReducer(state, action) {
      state.messagesHas = action.payload
    },
  },
})

export const {
  chatIdReducer,
  usernameReducer,
  idInstanceReducer,
  apiTokenInstanceReducer,
  messagesHasReducer,
} = chatSlice.actions

export default chatSlice.reducer
