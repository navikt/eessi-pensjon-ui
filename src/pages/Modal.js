import React, { useState } from 'react'
import Container from './Container'
import Modal from '../components/Modal/Modal'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Checkbox, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const ModalPage = () => {
  const [modal, setModal] = useState(undefined)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Modal dialog window</Systemtittel>
        <Normaltekst className='pb-4'>Modal dialog window util that opens when <code>modal</code> prop is not null nor undefined.</Normaltekst>

        <Modal modal={modal} onModalClose={() => setModal(undefined)} />
        <Checkbox
          label='Click me to trigger the modal'
          checked={modal !== undefined}
          onChange={() => {
            if (modal) {
              setModal(undefined)
            } else {
              setModal({
                modalTitle: 'Modal title',
                modalText: 'Modal text',
                modalButtons: [{
                  main: true,
                  text: 'yes, clean',
                  onClick: () => window.alert('Cleaning')
                }, {
                  text: 'no, cancel'
                }]
              })
            }
          }}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {' <Modal modal={modal} onModalClose={() => setModal(undefined)}/>\n' +
          '  <Checkbox label=\'Click me to trigger the modal\'\n' +
          '    checked={modal !== undefined}\n' +
          '    onChange={() => {\n' +
          '      if (modal) {\n' +
          '        setModal(undefined)\n' +
          '      } else {\n' +
          '        setModal({\n' +
          '          modalTitle: \'Modal title\',\n' +
          '          modalText: \'Modal text\',\n' +
          '          modalButtons: [{\n' +
          '            main: true,\n' +
          '            text: \'yes, clean\',\n' +
          '            onClick: () => window.alert(\'Cleaning\')\n' +
          '          }, {\n' +
          '            text: \'no, cancel\'\n' +
          '          }]\n' +
          '        })\n' +
          '      }\n' +
          '    }}\n' +
          ' />'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { Modal } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-modal</code></Normaltekst>

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
              <td>modal</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>modal content, with keys:
                <ul>
                  <li><code>modalTitle</code> - Modal's dialog title</li>
                  <li><code>modalContent</code> - Modal's dialog content. Can be a React component.</li>
                  <li><code>modalText</code> - In alternative to <code>modalContent</code>, a modalText string can be set</li>
                  <li><code>modalButtons</code> - List of objects for button rendering:
                    <ul>
                      <li><code>diabled</code> - boolean if the button should be disabled</li>
                      <li><code>main</code> - boolean for setting main button styles</li>
                      <li><code>text</code> - Button label</li>
                      <li><code>onClick</code> - Optional function to be called when button is pressed. All button presses close the modal.</li>
                    </ul>
                  </li>
                </ul>
              </td>
              <td>-</td>
            </tr>
            <tr>
              <td>onModalClose</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function called when modal closes. Can be used to clean up the <code>modal</code> prop</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default ModalPage
