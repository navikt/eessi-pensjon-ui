import React from 'react'
import Container from './Container'
import Dashboard from '../applications/Dashboard/Dashboard'
import { Normaltekst, Panel, Systemtittel } from '../Nav'

const defaultLayout = {
  'Side 1': {
    lg: [
      { i: 'w-1-note', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }
    ],
    md: [
      { i: 'w-1-note', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }
    ],
    sm: [
      { i: 'w-1-note', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }
    ]
  },
  'Side 2': {
    lg: [
      { i: 'w-2-smiley', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }
    ],
    md: [
      { i: 'w-2-smiley', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }
    ],
    sm: [
      { i: 'w-2-smiley', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }
    ]
  },
  'Side 3': {
    lg: [
      { i: 'w-3-cat', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 }
    ],
    md: [
      { i: 'w-3-cat', x: 0, y: 0, w: 2, h: 6, minW: 2, maxW: 3, minH: 1, maxH: 999 }
    ],
    sm: [
      { i: 'w-3-cat', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 999 }
    ]
  }
}

const DashboardPage = () => {
  return (
    <Container className='w-100'>
      <Panel className='p-4 w-100'>
        <Systemtittel className='pt-4 pb-4'>Dashboard page</Systemtittel>
        <Normaltekst>Dashboard Page</Normaltekst>
        <Dashboard
          id='eessi-pensjon-ui-demo'
          defaultLayout={defaultLayout}
          defaultTab='Side 1'
          allowedWidgets={['cat', 'smiley', 'note']}
        />
      </Panel>
    </Container>
  )
}

export default DashboardPage
