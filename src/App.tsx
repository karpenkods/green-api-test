import { Suspense, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material'

import './index.scss'
import { ChatPage, CreateChatPage, HomePage, ServiceUnablePage } from './pages'
import { themeReducer, useAppDispatch, useAppSelector } from './common'

function App() {
  const dispatch = useAppDispatch()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themePersist = useAppSelector((store) => store.theme.theme)

  if (!themePersist.length) {
    dispatch(themeReducer(prefersDarkMode ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themePersist === 'dark' ? 'dark' : 'light',
        },
      }),
    [themePersist],
  )

  return (
    <Suspense>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="" element={<HomePage />} />
          <Route path="create-chat" element={<CreateChatPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="404" element={<ServiceUnablePage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
