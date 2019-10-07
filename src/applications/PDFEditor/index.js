import React from 'react'
import Pdf from './Pdf'
import { StoreProvider } from './store'
import reducer, { initialState } from './reducer'
import './index.css'

const PDFEditor = () => (
  <StoreProvider initialState={initialState} reducer={reducer}>
    <Pdf />
  </StoreProvider>
)

export default PDFEditor
