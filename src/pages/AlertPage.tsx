import Alert from 'components/Alert/Alert'
import Mustache from 'mustache'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { State } from 'declarations/types'
import { Checkbox, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import { connect } from '../store'
import Container from 'pages/Container'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state: State) => ({ highContrast: state.highContrast })

const AlertPage: React.FC<PageProps> = ({ highContrast }: PageProps): JSX.Element => {
  const [fixed, setFixed] = useState<boolean>(false)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Alert</Systemtittel>
        <Normaltekst>Alert reuses the original
          <a className='ml-2' target='_blank' rel='noopener noreferrer' href='https://design.nav.no/components/alertstripe'>AlertStripe</a>, and adds:
        </Normaltekst>
        <ol>
          <li>A close button</li>
          <li>A fixed position mode</li>
          <li>A borderless, wide style for banner-type alerts</li>
        </ol>
        <Undertittel className='pt-4 pb-4'>Close button with callback function</Undertittel>
        <Normaltekst className='pb-4'>Tip: Use the <code>onClose</code> callback function to clear the <code>message</code> prop, in order to hide the Alert; if <code>message</code> is not given, the Alert is not displayed.</Normaltekst>
        <Alert
          className='w-50'
          type='client'
          fixed={false}
          status='OK'
          message='Close me for a function callback'
          onClose={() => window.alert('clicked')}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<Alert \n' +
          '  type=\'client\' \n' +
          '  status=\'OK\' \n' +
          '  fixed={false} \n' +
          '  message=\'Close me for a function callback\' \n' +
          '  onClose={() => window.alert(\'clicked\')}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Fixed mode</Undertittel>
        <Normaltekst className='pb-4'>Moved the alert to a fixed place on the middle top of the page</Normaltekst>
        <Checkbox label='fixed' checked={fixed} onChange={() => setFixed(!fixed)} />
        <div style={{ minHeight: '80px' }}>
          <Alert
            className='w-50'
            type='client'
            status='WARNING'
            fixed={fixed}
            message='Make me fixed by toggling the checkbox above'
          />
        </div>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<Alert \n' +
          '   type=\'client\' \n' +
          '   status=\'WARNING\' \n' +
          '   fixed={ {{fixed}} } \n' +
          '   message=\'Make me fixed by toggling the checkbox above\' \n' +
          '/>', { fixed: fixed.toString() })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Client/server mode</Undertittel>
        <Normaltekst>Server mode is a banner version of Alert, for more severe errors as server errors.</Normaltekst>
        <Normaltekst className='pb-4'>It has no border and it stretches its width to the parent container's
          width.
        </Normaltekst>
        <Alert type='server' message='Banner-style alert for important server errors' />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<Alert \n' +
          'type=\'server\' \n' +
          'message=\'Banner-style alert for important server errors\' \n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { Alert } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pt-4'>Default component's classname: <code>c-alert</code></Normaltekst>
        <Normaltekst>Type classname: <code>c-alert__type-client</code>, <code>c-alert__type-server</code></Normaltekst>
        <Normaltekst className='pb-4'>Status classname: <code>c-alert__status-OK</code>, <code>c-alert__status-ERROR</code>, <code>c-alert__status-WARNING</code></Normaltekst>

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
              <td>Error object - keys like <code>status</code>, <code>message</code>, <code>error</code> and <code>uuid</code> will be appended to the alert message</td>
              <td>-</td>
            </tr>
            <tr>
              <td>fixed</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Toggle fixed position</td>
              <td>false</td>
            </tr>
            <tr>
              <td>message</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Message to display in the alert panel. If there is no message, the alert will not be rendered.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onClose</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function for close icon click. If no function is given, the close icon is not displayed.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>status</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Alert style. Can be one of strings <code>OK</code>, <code>WARNING</code> or <code>ERROR</code>.</td>
              <td>ERROR</td>
            </tr>
            <tr>
              <td>type</td>
              <td><code>string</code></td>
              <td>true</td>
              <td>Alert type. Can be one of strings <code>client</code> or <code>server</code>.</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(AlertPage)
