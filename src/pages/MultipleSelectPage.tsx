import { PageProps } from 'pages/index'
import React from 'react'
import { State } from 'reducer'
import Container from './Container'
import MultipleSelect from 'components/MultipleSelect/MultipleSelect'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const MultipleSelectPage: React.FC<PageProps> = (): JSX.Element => {
  const highContrast = useSelector<State>(state => state.highContrast)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>Multiple select</Systemtittel>
        <Normaltekst>Select box where the user can select multiple options, and manage them in the main select box.</Normaltekst>
        <Normaltekst className='mb-4'>Aditionally, the user may add new options. Just type the new element in the select box, the press Enter to add.</Normaltekst>
        <Undertittel className='mt-4 mb-4'>Multiple select default with options and values</Undertittel>
        <Normaltekst className='mb-4'>This is the basic select with a given set of options and already selected values</Normaltekst>

        <MultipleSelect
          className='w-50 mb-4'
          label='Multiple select'
          ariaLabel='Multiple select'
          options={[
            { label: 'VIP', value: 'vip' },
            { label: 'Secret', value: 'secret' }
          ]}
          values={[{ label: 'VIP', value: 'vip' }]}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<MultipleSelect\n' +
          '  label=\'Multiple select\'\n' +
          '  ariaLabel=\'Multiple select\'\n' +
          '  options={[\n' +
          '    {label: \'VIP\', value: \'vip\'},\n' +
          '    {label: \'Secret\', value: \'secret\'}\n' +
          '  ]}\n' +
          '  values={[{ label: \'VIP\', value: \'vip\' }]}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Creatable multiple select with onSelect callback</Undertittel>
        <Normaltekst className='mb-4'>You can allow the user to add new options, by typing them in the select area.</Normaltekst>

        <MultipleSelect
          className='w-50  mb-4'
          creatable
          label='Creatable multiple select'
          ariaLabel='Creatable multiple select'
          options={[
            { label: 'VIP', value: 'vip' },
            { label: 'Secret', value: 'secret' }
          ]}
          placeholder='Enter tags'
          onSelect={(values) => window.alert('You selected ' + JSON.stringify(values))}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<MultipleSelect\n' +
            '  creatable={true}\n' +
            '  label=\'Creatable multiple select\'\n' +
            '  ariaLabel=\'Creatable multiple select\'\n' +
            '  options={[\n' +
            '    {label: \'VIP\', value: \'vip\'},\n' +
            '    {label: \'Secret\', value: \'secret\'}\n' +
            '  ]}\n' +
            '  placeholder=\'Enter tags\'\n' +
            '  onSelect={(values) => window.alert(\'You selected \' + JSON.stringify(values))}' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Multiple select with error style</Undertittel>

        <MultipleSelect
          className='w-50  mb-4'
          options={[]}
          label='Multiple select with error message'
          ariaLabel='Multiple select with error message'
          error='Please select one element'
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<MultipleSelect \n' +
           '  label=\'Multiple select with error message\'\n' +
           '  ariaLabel=\'Multiple select with error message\'\n' +
           '  error=\'Please select one element\'\n' +
           '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td>ariaLabel</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>ARIA label</td>
              <td>-</td>
            </tr>
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
              <td>Toggle between showing already selected options in the dropdown panel or not</td>
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
              <td>isLoading</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Loading spinner</td>
              <td>false</td>
            </tr>
            <tr>
              <td>label</td>
              <td><code>node</code>, <code>string</code></td>
              <td>true</td>
              <td>Element's label</td>
              <td>-</td>
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
