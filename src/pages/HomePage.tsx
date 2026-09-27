import { useTranslation } from 'react-i18next'

import { Home, Layout } from '../components'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <Layout
      container
      withNavbar
      title="GREEN-API-TEST"
      description={t('descriptionHome')}
    >
      <Home />
    </Layout>
  )
}
