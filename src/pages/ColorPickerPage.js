import React from 'react'
import Container from './Container'
import ColorPicker from '../components/ColorPicker/ColorPicker'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const ColorPickerPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Color picker</Systemtittel>
        <Normaltekst>Color picker used in the PDF Editor application, as a standalone component.</Normaltekst>
        <Normaltekst className='pb-4'>Click on the bottom button to open the color picker dialog. Click outside of the color picker to close it.</Normaltekst>

        <ColorPicker
          initialColor={{ r: 245, g: 166, b: 35, a: 0.5 }}
          onColorChanged={(color) => window.alert('color changed with  ' + JSON.stringify(color))}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<ColorPicker \n' +
          '  initialColor={{r: 245, g: 166, b: 35, a: 0.5}} \n' +
          '  onColorChanged={(color) => window.alert("color changed with  " + JSON.stringify(color))}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { ColorPicker } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-colorPicker</code></Normaltekst>

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
              <td>initialColor</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Initial code, in rgba object</td>
              <td><code>{'{'} r: 255, g: 255, b: 255, a: 1 {'}'}</code></td>
            </tr>
            <tr>
              <td>onColorChanged</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered on every color selection</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default ColorPickerPage
