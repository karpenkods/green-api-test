/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import PhoneInput from 'react-phone-input-2'
import ru from 'react-phone-input-2/lang/ru.json'
import 'react-phone-input-2/lib/style.css'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {
  checkAccountSchema,
  CostumButton,
  ICheckAccountRequest,
  IError,
  pushDangerNotification,
  pushSuccessNotification,
  useAppDispatch,
  useAppSelector,
  useAutoFocus,
  useCheckAccountMutation,
  openCreateChatReducer,
  chooseReducer,
} from '../../common'
import './createChat.scss'

export const CreateChat: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const focus = useAutoFocus()
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(768))

  const pathName = useAppSelector((store) => store.menu.pathName)
  const openCreateChat = useAppSelector((store) => store.menu.openCreateChat)
  const choose = useAppSelector((store) => store.menu.choose)

  const handleChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      chooseReducer(
        (event.target as HTMLInputElement).value as 'name' | 'phone',
      ),
    )
    formik.setFieldValue('username', '')
    formik.setFieldValue('phoneNumber', '')
    formik.setFieldTouched('username', false, false)
    formik.setFieldTouched('phoneNumber', false, false)
  }

  const [checkAccount, { isSuccess, error, data }] = useCheckAccountMutation()

  const formik = useFormik({
    initialValues: {
      idInstance: '',
      apiTokenInstance: '',
      username: '',
      phoneNumber: '',
      force: true,
    },
    validationSchema: checkAccountSchema(t, choose),
    onSubmit: async (value: ICheckAccountRequest) => {
      checkAccount({
        idInstance: value.idInstance,
        apiTokenInstance: value.apiTokenInstance,
        username: formik.values.phoneNumber ? null : value.username,
        phoneNumber: formik.values.username ? null : value.phoneNumber,
        force: true,
      })
    },
  })

  const phoneHasError =
    choose === 'phone' &&
    Boolean(formik.errors.phoneNumber) &&
    Boolean(formik.touched.phoneNumber)

  const phoneHelperText = phoneHasError
    ? String(formik.errors.phoneNumber)
    : ' '

  const handleClose = () => {
    dispatch(openCreateChatReducer(false))
    navigate(pathName)
  }

  useEffect(() => {
    if (isSuccess && data?.exist) {
      dispatch(pushSuccessNotification(`${t('loginSuccess')}`))
      dispatch(openCreateChatReducer(false))
      navigate('/chat')
      formik.resetForm()
    }
    if (isSuccess && !data?.exist) {
      dispatch(pushDangerNotification(`${t('notFound')}`))
    }
    if (error) {
      dispatch(
        pushDangerNotification(
          (error as IError)?.status === 401 || (error as IError)?.status === 404
            ? `${t('notAuthorized')}`
            : (error as IError)?.status === 469
              ? `${t('serverTelegram_2')}`
              : (error as IError)?.status === 500
                ? `${t('serverTelegram_3')}`
                : `${t('serverTelegram_1')}`,
        ),
      )
    }
  }, [error, isSuccess])

  return (
    <Dialog open={openCreateChat} keepMounted>
      <DialogTitle
        sx={{
          '&.MuiDialogTitle-root': {
            padding: '20px 24px 0 24px',
          },
        }}
        variant="body1"
        maxWidth="450px"
      >
        {t('createChatDesc_1')}{' '}
        <Typography component="span" color="primary">
          Telegram
        </Typography>
        , {t('createChatDesc_2')}{' '}
        <Typography
          variant="h6"
          fontFamily="marckScript !important"
          component="span"
          sx={{
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          color="success"
          onClick={() =>
            window.open(
              'https://green-api.com/',
              '_blank',
              'noopener,noreferrer',
            )
          }
        >
          GREEN-API
        </Typography>
        , {t('createChatDesc_3')}
      </DialogTitle>
      <DialogContent
        sx={{
          width: isMobile ? '100%' : '450px',
          padding: '0 20px',
          '&.MuiDialogContent-root': {
            paddingTop: '20px',
          },
        }}
      >
        <Stack direction="column" gap="15px" mb="15px">
          <TextField
            label="idInstance"
            type="text"
            name="idInstance"
            value={formik.values.idInstance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur('idInstance')}
            disabled={formik.isSubmitting}
            inputRef={focus}
            fullWidth
            size="medium"
            error={
              Boolean(formik.errors.idInstance) && formik.touched.idInstance
            }
            helperText={
              formik.errors.idInstance && formik.touched.idInstance
                ? formik.errors.idInstance
                : ' '
            }
          />
          <TextField
            label="apiTokenInstance"
            name="apiTokenInstance"
            type="text"
            value={formik.values.apiTokenInstance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur('apiTokenInstance')}
            disabled={formik.isSubmitting}
            fullWidth
            size="medium"
            error={
              Boolean(formik.errors.apiTokenInstance) &&
              formik.touched.apiTokenInstance
            }
            helperText={
              formik.errors.apiTokenInstance && formik.touched.apiTokenInstance
                ? formik.errors.apiTokenInstance
                : ' '
            }
          />
          <FormControl sx={{ gap: '8px' }}>
            <FormLabel id={choose}>{t('addUser')}</FormLabel>
            <RadioGroup value={choose} onChange={handleChoose}>
              <FormControlLabel
                value="name"
                control={<Radio />}
                label={t('username')}
              />
              <FormControlLabel
                value="phone"
                control={<Radio />}
                label={t('phoneNumber')}
              />
            </RadioGroup>
          </FormControl>
          {choose === 'name' ? (
            <TextField
              label={`@${t('username')}`}
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur('username')}
              disabled={formik.isSubmitting}
              fullWidth
              size="medium"
              error={Boolean(formik.errors.username) && formik.touched.username}
              helperText={
                formik.errors.username && formik.touched.username
                  ? formik.errors.username
                  : ' '
              }
            />
          ) : (
            <FormControl fullWidth error={phoneHasError}>
              <div
                className={`phone-input-wrapper ${
                  theme.palette.mode === 'dark'
                    ? 'phone-input-wrapper--dark'
                    : ''
                } ${phoneHasError ? 'phone-input-wrapper--error' : ' '}`}
              >
                <PhoneInput
                  placeholder={t('phoneNumber')}
                  localization={i18n.language === 'ru' ? ru : {}}
                  country={'ru'}
                  onlyCountries={['ru', 'by', 'kz']}
                  value={formik.values.phoneNumber}
                  onChange={(value) =>
                    formik.setFieldValue('phoneNumber', value)
                  }
                  onBlur={() => formik.setFieldTouched('phoneNumber', true)}
                  inputProps={{
                    name: 'phoneNumber',
                    disabled: formik.isSubmitting,
                  }}
                />
              </div>
              <FormHelperText>{phoneHelperText}</FormHelperText>
            </FormControl>
          )}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          '&.MuiDialogActions-root>:not(:first-of-type)': {
            marginLeft: 0,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          mb="25px"
          gap="8px"
        >
          <CostumButton
            onClick={handleClose}
            variant="contained"
            color="error"
            disabled={formik.isSubmitting}
            sx={{
              maxWidth: '200px',
              width: '100%',
            }}
          >
            {t('cancel')}
          </CostumButton>
          <CostumButton
            variant="contained"
            color="success"
            disabled={
              formik.isSubmitting ||
              !formik.dirty ||
              Object.keys(formik.errors).length > 0
            }
            onClick={() => formik.handleSubmit()}
            sx={{
              maxWidth: '200px',
              width: '100%',
            }}
          >
            {t('create')}
          </CostumButton>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
