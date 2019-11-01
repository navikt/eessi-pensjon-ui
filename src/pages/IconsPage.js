import React from 'react'
import Container from './Container'
import Icons, { availableIcons } from '../components/Icons/Icons'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { connect } from '../store'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import ReactTooltip from 'react-tooltip'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state) => ({ highContrast: state.highContrast })

const IconsPage = ({ highContrast }) => {
  return (
    <Container>
      <ReactTooltip place='top' type='dark' effect='solid' />
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>Icons</Systemtittel>
        <Normaltekst className='mt-4 mb-4'>Icon component that combines icons from <code>FontAwesome</code> and external SVG icons from NAV Ikoner DB</Normaltekst>
        <div className='d-flex flex-wrap' style={{ justifyContent: 'space-evenly' }}>
          {availableIcons.map(kind => (
            <Icons className='p-2' key={kind} kind={kind} size={48} data-tip={kind} />
          ))}
        </div>

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'{availableIcons.map(kind => (\n' +
          '    <Icons className=\'p-2\' kind={kind} size={48} data-tip={kind} />\n' +
          '))}'}
        </SyntaxHighlighter>
        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { Icons } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>

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
              <td>kind</td>
              <td><code>string</code></td>
              <td>true</td>
              <td>Icon kind</td>
              <td>-</td>
            </tr>
            <tr>
              <td>size</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Icon size</td>
              <td>24</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(IconsPage)
