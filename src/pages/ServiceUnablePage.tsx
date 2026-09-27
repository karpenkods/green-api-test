import { useTranslation } from 'react-i18next'
import { Layout, ServiceUnable } from '../components'

export function ServiceUnablePage() {
  const { t } = useTranslation()

  return (
    <Layout container={false} title={t('404')} description="">
      <ServiceUnable />
    </Layout>
  )
}
