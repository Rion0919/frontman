import Header from 'components/Header'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function UpdateUser() {
    const route = useRouter()
  return (
    <Layout>
        <Header back userId={route.query.userId} />
        <div>this is updateuser page</div>
    </Layout>
  )
}

