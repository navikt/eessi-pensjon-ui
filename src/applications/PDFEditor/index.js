import React from 'react'
import PDFEditor from './PDFEditor'
import { StoreProvider } from './store'
import reducer, { initialState } from './reducer'
import { Panel } from '../../Nav'
import './index.css'

const PDFApp = () => (
  <StoreProvider initialState={initialState} reducer={reducer}>
    <Panel>
      <PDFEditor />
    </Panel>
  </StoreProvider>
)

export default PDFApp
