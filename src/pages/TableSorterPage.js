import React, { useState } from 'react'
import Container from './Container'
import TableSorter from '../components/TableSorter/TableSorter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import Mustache from 'mustache'
import { Checkbox, Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const TableSorterPage = () => {
  const [loading, setLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Table Sorter</Systemtittel>
        <Normaltekst className='pb-4'>Table with sorting capabilities</Normaltekst>

        <Checkbox label='Toggle loading prop' checked={loading} onChange={() => setLoading(!loading)} />
        <Select
          className='w-25'
          label='Number of items per page'
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
        >
          <option>2</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </Select>
        <TableSorter
          items={[
            { name: 'Anna', date: new Date(1970, 2, 4), type: 'Analyst' },
            { name: 'Bernard', date: new Date(1980, 4, 8), type: 'Bookkeeper' },
            { name: 'Claire', date: new Date(1972, 6, 12), type: 'CEO' },
            { name: 'Daniel', date: new Date(1946, 2, 24), type: 'Developer' },
            { name: 'Emma', date: new Date(1947, 7, 1), type: 'Economist' },
            { name: 'Frank', date: new Date(1978, 11, 14), type: 'Freelancer' },
            { name: 'Gwyneth', date: new Date(1992, 1, 4), type: 'Geographer' },
            { name: 'Howard', date: new Date(2001, 9, 19), type: 'HR head' },
            { name: 'Iva', date: new Date(1925, 6, 12), type: 'Investor' },
            { name: 'John', date: new Date(1994, 3, 2), type: 'Journalist' },
            { name: 'Karen', date: new Date(1999, 9, 22), type: 'Knowledge engineer' },
            { name: 'Leonard', date: new Date(1991, 10, 26), type: 'Lawyer' },
            { name: 'Mary', date: new Date(1962, 10, 25), type: 'Marketing' },
            { name: 'Neville', date: new Date(1983, 1, 22), type: 'Nurse' },
            { name: 'Olivia', date: new Date(1992, 7, 2), type: 'Operations manager' },
            { name: 'Peter', date: new Date(1927, 6, 13), type: 'Project manager' },
            { name: 'Quincey', date: new Date(1965, 3, 11), type: 'Quality control' },
            { name: 'Ronald', date: new Date(1982, 8, 18), type: 'Realtor' },
            { name: 'Sally', date: new Date(1942, 8, 20), type: 'Sales manager' },
            { name: 'Ted', date: new Date(1968, 3, 22), type: 'Tester' },
            { name: 'Uma', date: new Date(1985, 9, 17), type: 'UI expert' },
            { name: 'Victor', date: new Date(2012, 12, 13), type: 'Video editor' },
            { name: 'Wanda', date: new Date(1947, 2, 2), type: 'Web designer' },
            { name: 'Xavier', date: new Date(1932, 7, 5), type: 'XML developer' },
            { name: 'Yvonne', date: new Date(1993, 2, 28), type: 'Yoga instructor' },
            { name: 'Ziggy', date: new Date(1929, 1, 14), type: 'Zoo keeper' }
          ]}
          itemsPerPage={itemsPerPage}
          loading={loading}
          sort={{ column: 'name', order: 'desc' }}
          columns={[
            { id: 'name', label: 'Name', type: 'string', filterText: '', defaultSortOrder: '' },
            { id: 'date', label: 'Date', type: 'date', filterText: '', defaultSortOrder: '' },
            { id: 'type', label: 'Occupation', type: 'tag', filterText: '', defaultSortOrder: '' }
          ]}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<TableSorter\n' +
           '  items={[\n' +
           '    { name: \'Anna\', date: new Date(1970, 2, 4), type: \'Analyst\' },\n' +
          '     { name: \'Bernard\', date: new Date(1980, 4, 8), type: \'Bookkeeper\' },\n' +
          '     { name: \'Claire\', date: new Date(1972, 6, 12), type: \'CEO\' },\n' +
          '     { name: \'Daniel\', date: new Date(1946, 2, 24), type: \'Developer\' },\n' +
          '     { name: \'Emma\', date: new Date(1947, 7, 1), type: \'Economist\' },\n' +
          '     { name: \'Frank\', date: new Date(1978, 11, 14), type: \'Freelancer\' },\n' +
          '     { name: \'Gwyneth\', date: new Date(1992, 1, 4), type: \'Geographer\' },\n' +
          '     { name: \'Howard\', date: new Date(2001, 9, 19), type: \'HR head\' },\n' +
          '     { name: \'Iva\', date: new Date(1925, 6, 12), type: \'Investor\' },\n' +
          '     { name: \'John\', date: new Date(1994, 3, 2), type: \'Journalist\' },\n' +
          '     { name: \'Karen\', date: new Date(1999, 9, 22), type: \'Knowledge engineer\' },\n' +
          '     { name: \'Leonard\', date: new Date(1991, 10, 26), type: \'Lawyer\' },\n' +
          '     { name: \'Mary\', date: new Date(1962, 10, 25), type: \'Marketing\' },\n' +
          '     { name: \'Neville\', date: new Date(1983, 1, 22), type: \'Nurse\' },\n' +
          '     { name: \'Olivia\', date: new Date(1992, 7, 2), type: \'Operations manager\' },\n' +
          '     { name: \'Peter\', date: new Date(1927, 6, 13), type: \'Project manager\' },\n' +
          '     { name: \'Quincey\', date: new Date(1965, 3, 11), type: \'Quality control\' },\n' +
          '     { name: \'Ronald\', date: new Date(1982, 8, 18), type: \'Realtor\' },\n' +
          '     { name: \'Sally\', date: new Date(1942, 8, 20), type: \'Sales manager\' },\n' +
          '     { name: \'Ted\', date: new Date(1968, 3, 22), type: \'Tester\' },\n' +
          '     { name: \'Uma\', date: new Date(1985, 9, 17), type: \'UI expert\' },\n' +
          '     { name: \'Victor\', date: new Date(2012, 12, 13), type: \'Video editor\' },\n' +
          '     { name: \'Wanda\', date: new Date(1947, 2, 2), type: \'Web designer\' },\n' +
          '     { name: \'Xavier\', date: new Date(1932, 7, 5), type: \'XML developer\' },\n' +
          '     { name: \'Yvonne\', date: new Date(1993, 2, 28), type: \'Yoga instructor\' },\n' +
          '     { name: \'Ziggy\', date: new Date(1929, 1, 14), type: \'Zoo keeper\' }  ' +
          '   ]}\n' +
          '   itemsPerPage={ {{itemsPerPage}} }\n' +
          '   loading={loading}\n' +
          '   sort={{ column: \'name\', order: \'desc\' }}\n' +
          '   columns={[\n' +
          '     {id: \'name\', label: \'Name\', type: \'string\', filterText: \'\', defaultSortOrder: \'\' },\n' +
          '     {id: \'date\', label: \'Date\', type: \'date\', filterText: \'\', defaultSortOrder: \'\' },\n' +
          '     {id: \'type\', label: \'Occupation\', type: \'tag\', filterText: \'\', defaultSortOrder: \'\' }\n' +
          '   ]}' +
           '/>', { itemsPerPage: itemsPerPage })}
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
              <td>context</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Optional context params to be passed when adding callback functions to cell elements</td>
              <td>-</td>
            </tr>
            <tr>
              <td>columns</td>
              <td><code>array</code></td>
              <td>false</td>
              <td>List with column data. Elements should be objects with keys <code>id</code>, <code>label</code>, <code>type</code>, <code>filterText</code>, <code>defaulsSortOrder</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td>items</td>
              <td><code>array</code></td>
              <td>false</td>
              <td>List with row data. List elements should be objects where keys match a given column id.</td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td>itemsPerPage</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>If pagination is <code>true</code>, sets the number of items per page.</td>
              <td><code>10</code></td>
            </tr>
            <tr>
              <td>initialPage</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>If pagination is true, set the initial page to be seen (default is 1)</td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td>loading</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Loading spinner, useful for lazy data fetch.</td>
              <td>false</td>
            </tr>
            <tr>
              <td>pagination</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Turns pagination on the table, to keep big tables in a manageable size.</td>
              <td>true</td>
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
