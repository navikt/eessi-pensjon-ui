import React from 'react'
import Container from './Container'
import Dashboard from '../applications/Dashboard/Dashboard'
import { Normaltekst, Panel, Systemtittel } from '../Nav'
const DashboardPage = () => {
  return (
    <Container className='w-100'>
      <Panel className='p-4 w-100'>
        <Systemtittel className='pt-4 pb-4'>Dashboard page</Systemtittel>
        <Normaltekst>Dashboard Page</Normaltekst>
        <Dashboard id='eessi-pensjon-ui-demo' />
      </Panel>
    </Container>
  )
}

export default DashboardPage
