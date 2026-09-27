import { useTranslation } from 'react-i18next'

import { Layout, CreateChat } from '../components'

export function CreateChatPage() {
  const { t } = useTranslation()

  return (
    <Layout
      container
      title={t('createChatTitle')}
      description={t('createChatDescription')}
    >
      <CreateChat />
    </Layout>
  )
}
