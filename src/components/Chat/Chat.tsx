/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

import {
  ISendMessageRequest,
  messagesHasReducer,
  pushDangerNotification,
  pushInfoNotification,
  pushSuccessNotification,
  sendMessageSchema,
  useAppDispatch,
  useAppSelector,
  useAutoFocus,
  useDeleteMessageMutation,
  useGetMessageQuery,
  useSendMessageMutation,
} from '../../common'
import { ChatMessages } from './ChatMessages'

export const Chat: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const focus = useAutoFocus()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  const chatId = useAppSelector((store) => store.chat.chatId)
  const idInstance = useAppSelector((store) => store.chat.idInstance)
  const apiTokenInstance = useAppSelector(
    (store) => store.chat.apiTokenInstance,
  )
  const messagesHas = useAppSelector((store) => store.chat.messagesHas)
  const darkTheme = useAppSelector((store) => store.theme.theme) === 'dark'

  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null)
  const emojiMenuOpen = Boolean(emojiAnchorEl)
  const emojis = ['😀', '😂', '😍', '👍', '🔥', '🙏', '🎉', '❤️', '🤝', '😎']

  const [
    sendMessage,
    {
      isSuccess: isSendMessageSuccess,
      isLoading: isSendMessageLoading,
      isError: isSendMessageError,
    },
  ] = useSendMessageMutation()

  const {
    data: message,
    isSuccess: isMessageSuccess,
    isError: isMessageError,
  } = useGetMessageQuery(
    { idInstance, apiTokenInstance },
    {
      skip: !chatId || !idInstance || !apiTokenInstance,
      refetchOnMountOrArgChange: true,
      pollingInterval: 5000,
      skipPollingIfUnfocused: true,
    },
  )

  const [deleteMessage] = useDeleteMessageMutation()

  const handleEmojiOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEmojiAnchorEl(event.currentTarget)
  }

  const handleEmojiClose = () => {
    setEmojiAnchorEl(null)
  }

  const handleEmojiSelect = (emoji: string) => {
    formik.setFieldValue('message', `${formik.values.message}${emoji}`)
    handleEmojiClose()
  }

  const formik = useFormik({
    initialValues: {
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
      chatId: chatId,
      message: '',
    },
    validationSchema: sendMessageSchema(t),
    onSubmit: async (value: ISendMessageRequest) => {
      sendMessage({
        idInstance: formik.values.idInstance,
        apiTokenInstance: formik.values.apiTokenInstance,
        chatId: formik.values.chatId,
        message: value.message,
      })
    },
  })

  useEffect(() => {
    if (isMessageSuccess && message?.receiptId) {
      dispatch(
        messagesHasReducer([
          ...messagesHas,
          {
            type: 'incoming',
            textMessage:
              message?.body?.messageData?.textMessageData?.textMessage,
            senderName: message?.body?.senderData?.senderName,
            time: message?.body?.timestamp,
          },
        ]),
      )
      deleteMessage({
        receiptId: message?.receiptId,
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance,
      })
      dispatch(pushSuccessNotification(t('newMessage')))
    }
  }, [isMessageSuccess, message?.receiptId])

  useEffect(() => {
    if (isSendMessageSuccess) {
      dispatch(
        messagesHasReducer([
          ...messagesHas,
          {
            type: 'outgoing',
            textMessage: formik.values.message,
            time: Date.now(),
          },
        ]),
      )
      dispatch(pushInfoNotification(t('messageSent')))
      formik.resetForm()
    }
  }, [isSendMessageSuccess])

  useEffect(() => {
    if (isSendMessageError) {
      dispatch(pushDangerNotification(t('sendMessageError')))
    }
  }, [isSendMessageError])

  useEffect(() => {
    if (isMessageError) {
      dispatch(pushDangerNotification(t('serverConnectionError')))
    }
  }, [isMessageError])

  return (
    <Fragment>
      <Stack
        position="fixed"
        bottom="16px"
        width={isMobile ? '95%' : '90%'}
        margin="0 auto"
        direction="row"
        gap="16px"
        alignItems="center"
        zIndex={99}
      >
        <FormControl
          fullWidth
          error={Boolean(formik.errors.message) && formik.touched.message}
        >
          <OutlinedInput
            placeholder={t('yourMessage')}
            name="message"
            type="text"
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isSendMessageLoading || !chatId}
            fullWidth
            multiline
            size="medium"
            inputRef={focus}
            maxRows={6}
            sx={{
              borderRadius: '8px',
              backgroundColor: darkTheme
                ? 'rgba(40, 44, 52, 0.62)'
                : 'rgba(255, 255, 255, 0.58)',
              backdropFilter: 'blur(5px)',
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  size="small"
                  color="warning"
                  onClick={handleEmojiOpen}
                  disabled={
                    formik.isSubmitting || isSendMessageLoading || !chatId
                  }
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              isMobile ? null : (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    color="warning"
                    onClick={() => formik.resetForm()}
                    disabled={formik.values.message.length === 0}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
          <FormHelperText>
            {formik.errors.message && formik.touched.message
              ? formik.errors.message
              : ' '}
          </FormHelperText>
        </FormControl>
        <Menu
          anchorEl={emojiAnchorEl}
          open={emojiMenuOpen}
          onClose={handleEmojiClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {emojis.map((emoji) => (
            <MenuItem key={emoji} onClick={() => handleEmojiSelect(emoji)}>
              {emoji}
            </MenuItem>
          ))}
        </Menu>
        {formik.values.message.length > 0 && (
          <IconButton
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting || isSendMessageLoading || !chatId}
            size="large"
            color="primary"
            sx={{
              marginBottom: '16px',
            }}
          >
            <SendIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>
      <ChatMessages />
    </Fragment>
  )
}
