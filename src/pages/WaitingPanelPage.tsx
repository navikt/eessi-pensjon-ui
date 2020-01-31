import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'reducer'
import Container from './Container'
import WaitingPanel from 'components/WaitingPanel/WaitingPanel'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import { Input, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import Mustache from 'mustache'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const WaitingPanelPage: React.FC<PageProps> = (): JSX.Element => {
  const [message, setMessage] = useState<string>('Vennligst vent...')
  const highContrast = useSelector<State>(state => state.highContrast)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Waiting panel</Systemtittel>
        <Normaltekst className='pb-4'>Simple waiting panel with a spinner gif and a message.</Normaltekst>
        <Input
          className='w-50'
          label='Waiting message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <WaitingPanel className='mt-4' message={message} />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<WaitingPanel message=\'' +
            '{{message}}' +
            '\'/>', { message: message })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Spinner sizes</Undertittel>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <WaitingPanel className='pr-3' size='XS' message='XS' />
          <WaitingPanel className='pr-3' size='S' message='S' />
          <WaitingPanel className='pr-3' size='M' message='M' />
          <WaitingPanel className='pr-3' size='L' message='L' />
          <WaitingPanel className='pr-3' size='XL' message='XL' />
        </div>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<WaitingPanel size=\'XS\' message=\'XS\'/>\n' +
          '<WaitingPanel size=\'S\' message=\'S\'/>\n' +
          '<WaitingPanel size=\'M\' message=\'M\'/>\n' +
          '<WaitingPanel size=\'L\' message=\'L\'/>\n' +
          '<WaitingPanel size=\'XL\' message=\'XL\'/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>One Line</Undertittel>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <WaitingPanel className='pr-3' size='XS' message='XS' />
          <WaitingPanel className='pr-3' size='XS' message='XS' oneLine />
        </div>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<WaitingPanel size=\'XS\' message=\'XS\'/>\n' +
          '<WaitingPanel size=\'XS\' message=\'XS\' oneLine/>\n'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td>oneLine</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Spinner and message in a single line</td>
              <td>false</td>
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
