import React, { useState } from 'react'
import Container from './Container'
import TableSorter from '../components/TableSorter/TableSorter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Checkbox, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const TableSorterPage = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Table Sorter</Systemtittel>
        <Normaltekst className='pb-4'>Table with sorting capabilities</Normaltekst>

        <Checkbox label='Toggle loading prop' checked={loading} onChange={() => setLoading(!loading)} />
        <TableSorter
          items={[
            { name: 'Anna', date: new Date(1970, 2, 4), type: 'Freelancer' },
            { name: 'Bernard', date: new Date(1980, 4, 8), type: 'Scrum master' },
            { name: 'Charles', date: new Date(1990, 6, 12), type: 'Product owner' }
          ]}
          loading={loading}
          sort={{ column: 'name', order: 'desc' }}
          columns={[
            { id: 'name', label: 'Name', type: 'string', filterText: '', defaultSortOrder: '' },
            { id: 'date', label: 'Date', type: 'date', filterText: '', defaultSortOrder: '' },
            { id: 'type', label: 'Occupation', type: 'tag', filterText: '', defaultSortOrder: '' }
          ]}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<TableSorter\n' +
           '  items={[\n' +
           '    { name: \'Anna\', date: new Date(1970, 2, 4), type: \'Freelancer\' },\n' +
           '    { name: \'Bernard\', date: new Date(1980, 4, 8), type: \'Scrum master\' },\n' +
           '    { name: \'Charles\', date: new Date(1990, 6, 12), type: \'Product owner\' }\n' +
           '  ]}\n' +
           '  loading={loading}\n' +
           '  sort={{ column: \'name\', order: \'desc\' }}\n' +
           '  columns={[\n' +
          '    {id: \'name\', label: \'Name\', type: \'string\', filterText: \'\', defaultSortOrder: \'\' },\n' +
          '    {id: \'date\', label: \'Date\', type: \'date\', filterText: \'\', defaultSortOrder: \'\' },\n' +
          '    {id: \'type\', label: \'Occupation\', type: \'tag\', filterText: \'\', defaultSortOrder: \'\' }\n' +
          '  ]}' +
           '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { TableSorter } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-tablesorter</code></Normaltekst>

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
              <td>columns</td>
              <td><code>array</code></td>
              <td>false</td>
              <td>List with column data. Elements should be objects with keys <code>id</code>, <code>label</code>, <code>type</code>, <code>filterText</code>, <code>defaulsSortOrder</code></td>
              <td>[]</td>
            </tr>
            <tr>
              <td>items</td>
              <td><code>array</code></td>
              <td>false</td>
              <td>List with row data. Elements should be objects where the key matches the column id.</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>loading</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Loading spinner, useful for lazy data fetch.</td>
              <td>false</td>
            </tr>
            <tr>
              <td>sort</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Initial sorting information.</td>
              <td>{'{'} column: '', order: '' {'}'}</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default TableSorterPage
