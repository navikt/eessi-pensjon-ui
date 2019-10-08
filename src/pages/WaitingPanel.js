import React, { useState } from 'react'
import Container from './Container'
import WaitingPanel from '../components/WaitingPanel/WaitingPanel'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Input, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const WaitingPanelPage = () => {
  const [message, setMessage] = useState('Vennligst vent...')
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Waiting panel</Systemtittel>
        <Normaltekst className='pb-4'>Simple waiting panel with a spinner gif and a message.</Normaltekst>

        <Input label='Waiting message' value={message} onChawueere nge={(e) => setMessage(e.target.value)} />
        <WaitingPanel message={message} />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<WaitingPanel message={message} />'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { WaitingPanel } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-waitingPanel</code></Normaltekst>

        <Undertittel className='pt-4 pb-4'>React props</Undertittel>
        <table className='tabell'>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>className</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Additional classnames</td>
              <td>-</td>
            </tr>
            <tr>
              <td>message</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Message to display</td>
              <td>'Vennligst vent...'</td>
            </tr>
            <tr>
              <td>size</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Size of the spinner. Can be one of NavFrontendSpinner values, 'XS', 'S', 'M', 'L', 'XL'</td>
              <td>M</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default WaitingPanelPage
