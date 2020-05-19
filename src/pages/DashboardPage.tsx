import Page from 'dashboard/lib/page'
import Container from 'pages/Container'
import { PageProps } from 'pages/index'
import React from 'react'
import { useSelector } from 'react-redux'
import { State } from 'reducer'

const DashboardPage: React.FC<PageProps> = (): JSX.Element => {
  const highContrast = useSelector<State>(state => state.highContrast)
  return (
    <Container>
      <Page highContrast={highContrast}/>
    </Container>
  )
}

export default DashboardPage
