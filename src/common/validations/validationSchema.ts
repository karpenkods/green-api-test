import * as Yup from 'yup'

export const checkAccountSchema = (
  t: (key: string) => string,
  choose: 'name' | 'phone',
) =>
  Yup.object().shape({
    idInstance: Yup.string().required(`${t('requiredidInstance')}`),
    apiTokenInstance: Yup.string().required(`${t('requiredapiTokenInstance')}`),
    username:
      choose === 'name'
        ? Yup.string()
            .required(`${t('requiredUsername')}`)
            .matches(/^@/, `${t('usernameMustStartWithAt')}`)
            .min(2, `${t('minimumCharacters')}`)
        : Yup.string().notRequired(),
    phoneNumber:
      choose === 'phone'
        ? Yup.string()
            .required(`${t('requiredphoneNumber')}`)
            .min(11, `${t('minimumNumbers')}`)
        : Yup.string().notRequired(),
  })

export const sendMessageSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    message: Yup.string()
      .required(`${t('required')}`)
      .max(3999, `${t('messageLong')}`),
  })
