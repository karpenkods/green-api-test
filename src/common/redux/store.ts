import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import snackbarReducer from './slices/snackbarSlice'
import menuReducer from './slices/menuSlice'
import themeAppReducer from './slices/themeSlice'
import chatReducer from './slices/chatSlice'
import { checkAccountApi } from './api/checkAccount'
import { messagesApi } from './api/messages'

const rootReducer = combineReducers({
  [checkAccountApi.reducerPath]: checkAccountApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
  snackbar: snackbarReducer,
  menu: menuReducer,
  theme: themeAppReducer,
  chat: chatReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [checkAccountApi.reducerPath, messagesApi.reducerPath],
  whitelist: ['theme'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(checkAccountApi.middleware, messagesApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
