import React, { useState } from 'react'
import Container from './Container'
import Alert from '../components/Alert/Alert'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Checkbox, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const IndexPage = () => {
  const [fixed, setFixed] = useState(false)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Alert</Systemtittel>
        <Normaltekst>Changes over the original
          <a className='ml-2' href='https://design.nav.no/components/alertstripe'>
            AlertStripe
          </a>
          :
        </Normaltekst>
        <Undertittel className='pt-4 pb-4'>Close button with callback function</Undertittel>
        <Alert
          type='client' fixed={false} message='Close me for a function callback'
          onClientClear={() => { window.alert('clicked') }}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Alert \n' +
          'type=\'client\' \n' +
          'fixed={false} \n' +
          'message=\'Close me for a function callback\' \n' +
          'onClientClear={() => {window.alert(\'clicked\')}}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Fixed mode</Undertittel>
        <Normaltekst className='pb-4'>Moved the alert to a fixed place on the middle top of the page</Normaltekst>
        <Checkbox label='fixed' checked={fixed} onChange={() => setFixed(!fixed)} />
        <Alert type='client' fixed={fixed} message='Make me fixed by toggling the checkbox' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Alert \n' +
          'type=\'client\' \n' +
          'fixed={true} \n' +
          'message=\'Make me fixed by toggling the checkbox\' \n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Client/server mode</Undertittel>
        <Normaltekst>Server mode is a banner version of Alert, for more severe errors as server errors.</Normaltekst>
        <Normaltekst className='pb-4'>It has no border and it stretches its width to the parent container's
          width.
        </Normaltekst>
        <Alert type='server' message='Server error' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Alert \n' +
          'type=\'server\' \n' +
          'message=\'Server error\' \n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { Alert } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-alert</code></Normaltekst>

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
              <td>error</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Error object - params like status, message, error and uui will be appended to the message</td>
              <td>-</td>
            </tr>
            <tr>
              <td>fixed</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Set fixed position for client alerts</td>
              <td>false</td>
            </tr>
            <tr>
              <td>message</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Message to dispplay in the alert. If there is no message, the alert will not be rendered.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onClear</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function for a close icon. If no function is given, the close icon is not displayed.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>status</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Alert style. Can be <code>OK</code>, <code>WARNING</code> or <code>ERROR</code>.</td>
              <td>ERROR</td>
            </tr>
            <tr>
              <td>type</td>
              <td><code>string</code></td>
              <td>true</td>
              <td>Alert type. Can be <code>client</code> or <code>server</code>.</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default IndexPage
