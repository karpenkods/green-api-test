import { useTranslation } from 'react-i18next'

import { Chat, Layout } from '../components'

export function ChatPage() {
  const { t } = useTranslation()

  return (
    <Layout
      container
      withNavbar
      title={t('chatTitle')}
      description={t('chatDescription')}
    >
      <Chat />
    </Layout>
  )
}
