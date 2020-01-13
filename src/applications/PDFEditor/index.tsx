import React from 'react'
import PDFEditor from 'applications/PDFEditor/PDFEditor'
import { StoreProvider } from 'store'
import reducer, { initialState } from 'applications/PDFEditor/reducer'
import { Panel } from 'Nav'
import './index.css'

const PDFApp: React.FC = (): JSX.Element => (
  <StoreProvider initialState={initialState} reducer={reducer}>
    <Panel>
      <PDFEditor />
    </Panel>
  </StoreProvider>
)

export default PDFApp
