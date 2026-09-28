/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import { useAppSelector } from '../../common'

export const ChatMessages: FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))
  const isTablet = useMediaQuery(theme.breakpoints.down(970))

  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  const messagesHas = useAppSelector((store) => store.chat.messagesHas)
  const darkTheme = useAppSelector((store) => store.theme.theme) === 'dark'

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return
    }
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight
  }, [messagesHas.length])

  const formatMessageTime = (time?: number) => {
    if (!time) {
      return ''
    }

    const date = time > 1e12 ? moment(time).local() : moment.unix(time).local()

    return date.format('HH:mm DD.MM.YYYY')
  }

  return (
    <Stack
      ref={messagesContainerRef}
      position="absolute"
      top="140px"
      width={isMobile ? '95%' : '90%'}
      height="60%"
      margin="0 auto"
      gap="24px"
      overflow="auto"
    >
      {messagesHas.map((message, index) => (
        <Stack
          key={index}
          gap="12px"
          p="16px"
          border={
            message?.type === 'outgoing'
              ? '2px solid #90caf9'
              : '2px solid #66bb6a'
          }
          borderRadius="8px"
          width={isMobile ? '95%' : isTablet ? '80%' : '45%'}
          marginRight={message?.type === 'outgoing' ? '8px' : 0}
          alignSelf={message?.type === 'outgoing' ? 'flex-end' : 'flex-start'}
          sx={{
            backgroundColor: darkTheme
              ? 'rgba(40, 44, 52, 0.62)'
              : 'rgba(255, 255, 255, 0.58)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Stack direction="row" justifyContent="space-between" gap="8px">
            <Typography
              color={message?.type === 'outgoing' ? '#90caf9' : '#66bb6a'}
            >
              {message?.type === 'outgoing' ? t('you') : message?.senderName}
            </Typography>
            <Typography
              color={message?.type === 'outgoing' ? '#90caf9' : '#66bb6a'}
            >
              {formatMessageTime(message?.time)}
            </Typography>
          </Stack>
          <Typography>{message?.textMessage}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}
