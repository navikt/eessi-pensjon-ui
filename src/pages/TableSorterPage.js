import React, { useState } from 'react'
import Container from './Container'
import TableSorter from 'components/TableSorter/TableSorter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { connect } from '../store'
import Mustache from 'mustache'
import { Checkbox, EtikettLiten, Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state) => ({ highContrast: state.highContrast })

const TableSorterPage = ({ highContrast }) => {
  const [loading, setLoading] = useState(false)
  const [animatable, setAnimatable] = useState(true)
  const [searchable, setSearchable] = useState(true)
  const [selectable, setSelectable] = useState(true)
  const [sortable, setSortable] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Table Sorter</Systemtittel>
        <Normaltekst className='pb-4'>Table with sorting capabilities</Normaltekst>

        <Checkbox label='Toggle loading prop' checked={loading} onChange={() => setLoading(!loading)} />
        <Checkbox label='Toggle animation' checked={animatable} onChange={() => setAnimatable(!animatable)} />
        <Checkbox label='Toggle searchable' checked={searchable} onChange={() => setSearchable(!searchable)} />
        <Checkbox label='Toggle selectable' checked={selectable} onChange={() => setSelectable(!selectable)} />
        <Checkbox label='Toggle sortable' checked={sortable} onChange={() => setSortable(!sortable)} />
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
            { key: '01', name: 'Anna', date: new Date(1970, 2, 4), type: 'Analyst', selected: true },
            { key: '02', name: 'Bernard', date: new Date(1980, 4, 8), type: 'Bookkeeper' },
            { key: '03', name: 'Claire', date: new Date(1972, 6, 12), type: 'CEO' },
            { key: '04', name: 'Daniel', date: new Date(1946, 2, 24), type: 'Developer' },
            { key: '05', name: 'Emma', date: new Date(1947, 7, 1), type: 'Economist', selected: true },
            { key: '06', name: 'Frank', date: new Date(1978, 11, 14), type: 'Freelancer' },
            { key: '07', name: 'Gwyneth', date: new Date(1992, 1, 4), type: 'Geographer' },
            { key: '08', name: 'Howard', date: new Date(2001, 9, 19), type: 'HR head' },
            { key: '09', name: 'Iva', date: new Date(1925, 6, 12), type: 'Investor', selected: true },
            { key: '10', name: 'John', date: new Date(1994, 3, 2), type: 'Journalist' },
            { key: '11', name: 'Karen', date: new Date(1999, 9, 22), type: 'Knowledge engineer' },
            { key: '12', name: 'Leonard', date: new Date(1991, 10, 26), type: 'Lawyer' },
            { key: '13', name: 'Mary', date: new Date(1962, 10, 25), type: 'Marketing' },
            { key: '14', name: 'Neville', date: new Date(1983, 1, 22), type: 'Nurse' },
            { key: '15', name: 'Olivia', date: new Date(1992, 7, 2), type: 'Operations manager', selected: true },
            { key: '16', name: 'Peter', date: new Date(1927, 6, 13), type: 'Project manager' },
            { key: '17', name: 'Quincey', date: new Date(1965, 3, 11), type: 'Quality control' },
            { key: '18', name: 'Ronald', date: new Date(1982, 8, 18), type: 'Realtor' },
            { key: '19', name: 'Sally', date: new Date(1942, 8, 20), type: 'Sales manager' },
            { key: '20', name: 'Ted', date: new Date(1968, 3, 22), type: 'Tester' },
            { key: '21', name: 'Uma', date: new Date(1985, 9, 17), type: 'UI expert', selected: true },
            { key: '22', name: 'Victor', date: new Date(2012, 12, 13), type: 'Video editor' },
            { key: '23', name: 'Wanda', date: new Date(1947, 2, 2), type: 'Web designer' },
            { key: '24', name: 'Xavier', date: new Date(1932, 7, 5), type: 'XML developer' },
            { key: '25', name: 'Yvonne', date: new Date(1993, 2, 28), type: 'Yoga instructor' },
            { key: '26', name: 'Ziggy', date: new Date(1929, 1, 14), type: 'Zoo keeper' }
          ]}
          itemsPerPage={itemsPerPage}
          loading={loading}
          sort={{ column: 'name', order: 'ascending' }}
          animatable={animatable}
          searchable={searchable}
          selectable={selectable}
          sortable={sortable}
          columns={[
            { id: 'name', label: 'Name', type: 'string', filterText: '', defaultSortOrder: 'ascending' },
            { id: 'date', label: 'Date', type: 'date', filterText: '', defaultSortOrder: '' },
            {
              id: 'type',
              label: 'Occupation',
              type: 'string',
              filterText: '',
              defaultSortOrder: '',
              renderCell: (item, value) => <EtikettLiten>{value}</EtikettLiten>
            }
          ]}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<TableSorter\n' +
           '  items={[\n' +
           '    { key: \'01\', name: \'Anna\', date: new Date(1970, 2, 4), type: \'Analyst\' , selected: true },\n' +
          '     { key: \'02\', name: \'Bernard\', date: new Date(1980, 4, 8), type: \'Bookkeeper\' },\n' +
          '     { key: \'03\', name: \'Claire\', date: new Date(1972, 6, 12), type: \'CEO\' },\n' +
          '     { key: \'04\', name: \'Daniel\', date: new Date(1946, 2, 24), type: \'Developer\' },\n' +
          '     { key: \'05\', name: \'Emma\', date: new Date(1947, 7, 1), type: \'Economist\' , selected: true },\n' +
          '     { key: \'06\', name: \'Frank\', date: new Date(1978, 11, 14), type: \'Freelancer\' },\n' +
          '     { key: \'07\', name: \'Gwyneth\', date: new Date(1992, 1, 4), type: \'Geographer\' },\n' +
          '     { key: \'08\', name: \'Howard\', date: new Date(2001, 9, 19), type: \'HR head\' },\n' +
          '     { key: \'09\', name: \'Iva\', date: new Date(1925, 6, 12), type: \'Investor\' , selected: true },\n' +
          '     { key: \'10\', name: \'John\', date: new Date(1994, 3, 2), type: \'Journalist\' },\n' +
          '     { key: \'11\', name: \'Karen\', date: new Date(1999, 9, 22), type: \'Knowledge engineer\' },\n' +
          '     { key: \'12\', name: \'Leonard\', date: new Date(1991, 10, 26), type: \'Lawyer\' },\n' +
          '     { key: \'13\', name: \'Mary\', date: new Date(1962, 10, 25), type: \'Marketing\' },\n' +
          '     { key: \'14\', name: \'Neville\', date: new Date(1983, 1, 22), type: \'Nurse\' },\n' +
          '     { key: \'15\', name: \'Olivia\', date: new Date(1992, 7, 2), type: \'Operations manager\' , selected: true },\n' +
          '     { key: \'16\', name: \'Peter\', date: new Date(1927, 6, 13), type: \'Project manager\' },\n' +
          '     { key: \'17\', name: \'Quincey\', date: new Date(1965, 3, 11), type: \'Quality control\' },\n' +
          '     { key: \'18\', name: \'Ronald\', date: new Date(1982, 8, 18), type: \'Realtor\' },\n' +
          '     { key: \'19\', name: \'Sally\', date: new Date(1942, 8, 20), type: \'Sales manager\' },\n' +
          '     { key: \'20\', name: \'Ted\', date: new Date(1968, 3, 22), type: \'Tester\' },\n' +
          '     { key: \'21\', name: \'Uma\', date: new Date(1985, 9, 17), type: \'UI expert\' , selected: true },\n' +
          '     { key: \'22\', name: \'Victor\', date: new Date(2012, 12, 13), type: \'Video editor\' },\n' +
          '     { key: \'23\', name: \'Wanda\', date: new Date(1947, 2, 2), type: \'Web designer\' },\n' +
          '     { key: \'24\', name: \'Xavier\', date: new Date(1932, 7, 5), type: \'XML developer\' },\n' +
          '     { key: \'25\', name: \'Yvonne\', date: new Date(1993, 2, 28), type: \'Yoga instructor\' },\n' +
          '     { key: \'26\', name: \'Ziggy\', date: new Date(1929, 1, 14), type: \'Zoo keeper\' }\n' +
          '   ]}\n' +
          '   itemsPerPage={ {{itemsPerPage}} }\n' +
          '   loading={ {{loading}} }\n' +
          '   animatable={ {{animatable}} }\n' +
          '   searchable={ {{searchable}} }\n' +
          '   selectable={ {{selectable}} }\n' +
          '   sortable={ {{sortable}} }\n' +
          '   sort={{ column: \'name\', order: \'ascending\' }}\n' +
          '   columns={[\n' +
          '     {id: \'name\', label: \'Name\', type: \'string\', filterText: \'\', defaultSortOrder: \'ascending\' },\n' +
          '     {id: \'date\', label: \'Date\', type: \'date\', filterText: \'\', defaultSortOrder: \'\' },\n' +
          '     {id: \'type\', label: \'Occupation\', type: \'string\', filterText: \'\', defaultSortOrder: \'\',\n' +
          '       renderCell: (item, value) => <EtikettLiten>{value}</EtikettLiten>\n' +
          '     }\n' +
          '   ]}' +
           '/>', {
            loading: loading,
            itemsPerPage: itemsPerPage,
            animatable: animatable,
            searchable: searchable,
            selectable: selectable,
            sortable: sortable
          })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td>animatable</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Animate rows</td>
              <td>true</td>
            </tr>
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
              <td>onRowSelectChange</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function when selection mode of at least one row changes. The table items are returned as param</td>
              <td>-</td>
            </tr>
            <tr>
              <td>pagination</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Turns pagination on the table, to keep big tables in a manageable size.</td>
              <td>true</td>
            </tr>
            <tr>
              <td>searchable</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Adds a search icon that allows row search fields to show</td>
              <td>true</td>
            </tr>
            <tr>
              <td>selectable</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Renders a first column with checkboxes that trigger the <code>onRowSelectChange</code> callback function</td>
              <td>false</td>
            </tr>
            <tr>
              <td>sort</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Allow sortable table headers</td>
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

export default connect(mapStateToProps, () => {})(TableSorterPage)
