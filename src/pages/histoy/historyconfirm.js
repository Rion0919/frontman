import Header from 'components/Header'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function HistoryConfirm() {
    const route = useRouter()
  return (
    <Layout>
        <Header back userId={route.query.userId} />
        <div>this is history confirm page</div>
    </Layout>
  )
}

