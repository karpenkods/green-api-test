import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import {
  openCreateChatReducer,
  pathNameReducer,
  useAppDispatch,
} from '../../common'

export const Home: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  return (
    <Stack direction="column" alignItems="center" justifyContent="center">
      <Typography
        variant="h3"
        color="tomato"
        fontFamily="marckScript !important"
        fontSize={isMobile ? '36px' : '56px'}
        fontWeight={500}
        textAlign="center"
        maxWidth="800px"
      >
        {t('titleHome')}
      </Typography>
      <Typography
        variant="h3"
        color="primary"
        mb="24px"
        fontFamily="marckScript !important"
        fontSize={isMobile ? '48px' : '72px'}
        fontWeight={500}
        textAlign="center"
      >
        Telegram
      </Typography>

      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        textAlign="center"
        maxWidth="800px"
        mb="24px"
      >
        {t('descriptionHomeNotAuth_1')}
      </Typography>

      <Link
        component="button"
        onClick={() => {
          navigate('/create-chat')
          dispatch(openCreateChatReducer(true))
          dispatch(pathNameReducer('/home'))
        }}
        underline="hover"
        fontSize={isMobile ? '18px' : '24px'}
        color="tomato"
      >
        {t('createChat')}
      </Link>
    </Stack>
  )
}
