import React from 'react'
import Container from './Container'
import Banner from '../components/Banner/Banner'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const BannerPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Banner</Systemtittel>
        <Normaltekst>Sets up the default EESSI Pensjon banner with Pensjon's orange color</Normaltekst>

        <Banner
          labelHighContrast='High contrast'
          header='Banner header'
          toggleHighContrast={() => window.alert('high contrast link clicked')}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Banner \n' +
          'labelHighContrast=\'High contrast\' \n' +
          'header=\'Banner header\' \n' +
          'toggleHighContrast={() => window.alert(\'high contrast link clicked\')}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { Banner } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-banner</code></Normaltekst>

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
              <td>labelHighContrast</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Label to show in the high constrast link</td>
              <td>'Høy konstrast'</td>
            </tr>
            <tr>
              <td>header</td>
              <td><code>React component or string</code></td>
              <td>false</td>
              <td>Banner's title</td>
              <td>-</td>
            </tr>
            <tr>
              <td>toggleHighContrast</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function for high contrast link click. If no function is given, the link is not shown.</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default BannerPage
