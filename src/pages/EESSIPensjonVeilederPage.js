import React from 'react'
import Container from './Container'
import EESSIPensjonVeileder from '../components/EESSIPensjonVeileder/EESSIPensjonVeileder'
import EESSIPensjonVeilederPanel from '../components/EESSIPensjonVeileder/EESSIPensjonVeilederPanel'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { connect } from '../store'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state) => ({ highContrast: state.highContrast })

const EESSIPensjonVeilederPage = ({ highContrast }) => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>EESSIPensjonVeileder</Systemtittel>
        <Normaltekst>This component renders the EESSI Pensjon veileder's avatar, named EESSIPensjonVeileder</Normaltekst>

        <Undertittel className='pt-4 pb-4'>Single veileder</Undertittel>

        <EESSIPensjonVeileder />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<EESSIPensjonVeileder/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Single veileder: trist version</Undertittel>

        <EESSIPensjonVeileder mood='trist' />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<EESSIPensjonVeileder mood=\'trist\'/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Veileder panel</Undertittel>

        <EESSIPensjonVeilederPanel closeButton>
          <div>Please log in to see your settings page</div>
        </EESSIPensjonVeilederPanel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<EESSIPensjonVeilederPanel closeButton={true}>\n' +
          '  <div>Please log in to see your settings page</div>\n' +
          ' </EESSIPensjonVeilederPanel>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { EESSIPensjonVeileder } from \'eessi-pensjon-ui\'\n' +
          'import { EESSIPensjonVeilederPanel } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-EESSIPensjonVeileder</code>, <code>c-EESSIPensjonVeilederPanel</code></Normaltekst>

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
              <td>closeButton</td>
              <td><code>button</code></td>
              <td>false</td>
              <td>Render a close button for the EESSIPensjonVeilederPanel </td>
              <td>false</td>
            </tr>
            <tr>
              <td>mood</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Veieder's mood. Can take two values, <code>smilende</code> or <code>trist</code></td>
              <td><code>smilende</code></td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(EESSIPensjonVeilederPage)
