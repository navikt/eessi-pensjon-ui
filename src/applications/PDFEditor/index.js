import React from 'react'
import Pdf from './Pdf'
import { StoreProvider } from './store'
import reducer, { initialState } from './reducer'
import { Panel } from '../../Nav'
import './index.css'

const PDFEditor = () => (
  <StoreProvider initialState={initialState} reducer={reducer}>
    <Panel>
      <Pdf />
    </Panel>
  </StoreProvider>
)

export default PDFEditor
