import React from 'react'
import Container from './Container'
import MultipleSelect from '../components/MultipleSelect/MultipleSelect'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const MultipleSelectPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Multiple select</Systemtittel>
        <Normaltekst>Select box where the user can select multiple options, and manage them in the main select box.</Normaltekst>
        <Normaltekst className='pb-4'>Aditionally, the user may add new options. Just type the new element in the select box, the press Enter to add.</Normaltekst>

        <MultipleSelect
          className='w-50'
          creatable
          options={[{ label: 'VIP', value: 'vip' }, { label: 'Secret', value: 'secret' }]}
          placeholder='Enter tags'
          onSelect={(values) => window.alert('You selected ' + JSON.stringify(values))}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<MultipleSelect\n' +
            'creatable={true}\n' +
            'options={[{label: \'VIP\', value: \'vip\'}, {label: \'Secret\', value: \'secret\'}]}\n' +
            'placeholder=\'Enter tags\'\n' +
            'onSelect={(values) => window.alert(\'You selected \' + JSON.stringify(values))}' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Multiple select with error style</Undertittel>

        <MultipleSelect
          className='w-50'
          error='Please select one element'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<MultipleSelect error=\'Please select one element\'\n/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { MultipleSelect } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-multipleSelect</code></Normaltekst>

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
              <td>creatable</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Allow user to create new options, or stick to the existing ones</td>
              <td>false</td>
            </tr>
            <tr>
              <td>error</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>If error prop is given, the component will have a error style and display an error message</td>
              <td>false</td>
            </tr>
            <tr>
              <td>hideSelectedOptions</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Toggle bewtween showing selected options in the dropdown panel or not</td>
              <td>false</td>
            </tr>
            <tr>
              <td>id</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>ID string to use in the children components</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onSelect</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function called when selected options change</td>
              <td>-</td>
            </tr>
            <tr>
              <td>options</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>Initial option list. List elements must have <code>label</code> and <code>value</code> keys.</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Text to display in the select box when it is empty.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>values</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List of initial selected options</td>
              <td>[]</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default MultipleSelectPage
