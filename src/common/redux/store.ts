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
import { checkAccountApi } from './api/checkAccount'

const rootReducer = combineReducers({
  [checkAccountApi.reducerPath]: checkAccountApi.reducer,
  snackbar: snackbarReducer,
  menu: menuReducer,
  theme: themeAppReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [checkAccountApi.reducerPath],
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
    }).concat(checkAccountApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
