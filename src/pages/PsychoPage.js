import React from 'react'
import Container from './Container'
import Psycho from '../components/Psycho/Psycho'
import PsychoPanel from '../components/Psycho/PsychoPanel'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const PsychoPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Psycho</Systemtittel>
        <Normaltekst>This component renders the EESSI Pensjon veileder's avatar, named Psycho</Normaltekst>

        <Undertittel className='pt-4 pb-4'>Single veileder</Undertittel>

        <Psycho />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Psycho/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Single veileder: trist version</Undertittel>

        <Psycho mood='trist' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<Psycho mood=\'trist\'/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Veileder panel</Undertittel>

        <PsychoPanel closeButton>
          <div>Please log in to see your settings page</div>
        </PsychoPanel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<PsychoPanel closeButton={true}>\n' +
          '  <div>Please log in to see your settings page</div>\n' +
          ' </PsychoPanel>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { Psycho } from \'eessi-pensjon-ui\'\n' +
          'import { PsychoPanel } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-psycho</code>, <code>c-psychoPanel</code></Normaltekst>

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
              <td>Render a close button for the PsychoPanel </td>
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

export default PsychoPage
