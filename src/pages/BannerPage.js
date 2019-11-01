import React from 'react'
import Container from './Container'
import Banner from '../components/Banner/Banner'
import EESSIPensjonVeileder from '../components/EESSIPensjonVeileder/EESSIPensjonVeileder'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import { connect } from '../store'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state) => ({ highContrast: state.highContrast })

const BannerPage = ({ highContrast }) => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Banner</Systemtittel>
        <Normaltekst>Banner renders the default EESSI Pensjon banner with its assigned orange color.</Normaltekst>
        <Normaltekst>It contains a 'high contrast' link in the corner that triggers a callback function for toggling CSS styles.</Normaltekst>
        <Normaltekst>You may want to use this banner for your index page decoration.</Normaltekst>
        <Undertittel className='pt-4 pb-4'>Default mode</Undertittel>

        <Banner
          header='Banner header'
          onHighContrastClicked={() => window.alert('high contrast link clicked')}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<Banner \n' +
          '  header=\'Banner header\' \n' +
          '  onHighContrastClicked={() => window.alert(\'high contrast link clicked\')}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Custom mode</Undertittel>

        <Normaltekst>The <code>header</code> can be assigned to another React component, as the example below shows.</Normaltekst>
        <Normaltekst className='pb-4'>You can also pass a <code>style</code> prop to override the default background color</Normaltekst>

        <Banner
          style={{ backgroundColor: 'lightblue' }}
          labelHighContrast='Alternative label'
          header={<EESSIPensjonVeileder />}
          onHighContrastClicked={() => {}}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<Banner \n' +
          '  style={{ backgroundColor: \'lightblue\' }}\n' +
          '  labelHighContrast=\'Alternative label\' \n' +
          '  header={<EESSIPensjonVeileder />} \n' +
          '  onHighContrastClicked={() => {}}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td>Label of the 'high constrast' link</td>
              <td>'Høy konstrast'</td>
            </tr>
            <tr>
              <td>header</td>
              <td><code>React component</code>, <code>string</code></td>
              <td>false</td>
              <td>Banner's title</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onHighContrastClicked</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function for high contrast link click. If no function is given, the link is not shown.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>style</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Additional styles for the component</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(BannerPage)
