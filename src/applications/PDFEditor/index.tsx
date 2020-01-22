import PDFEditor from 'applications/PDFEditor/PDFEditor'
import reducer from './reducer'
import { Panel } from 'Nav'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'

const store = createStore(reducer)

const PDFApp: React.FC = (): JSX.Element => (
  <Provider store={store}>
    <Panel>
      <PDFEditor />
    </Panel>
  </Provider>
)

export default PDFApp
