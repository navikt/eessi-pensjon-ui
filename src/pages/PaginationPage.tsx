import Pagination from 'components/Pagination/Pagination'
import Mustache from 'mustache'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { State } from 'reducer'
import { Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
import Container from './Container'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const PaginationPage: React.FC<PageProps> = (): JSX.Element => {
  const [numberOfItems, setNumberOfItems] = useState(50)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const highContrast = useSelector<State>(state => state.highContrast)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Pagination</Systemtittel>
        <Normaltekst className='pb-4'>Buttons for page navigation</Normaltekst>
        <div className='d-flex'>
          <Select
            className='w-33 mr-3'
            label='Number of items'
            value={numberOfItems}
            onChange={(e) => setNumberOfItems(parseInt(e.target.value, 10))}
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </Select>

          <Select
            className='w-33'
            label='Number of items per page'
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </Select>
        </div>
        <Pagination
          className='mt-4 mb-4'
          numberOfItems={numberOfItems}
          itemsPerPage={itemsPerPage}
          onChange={(page) => console.log('Changed to page ' + page)}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<Pagination\n' +
            '   numberOfItems={ {{numberOfItems}} }\n' +
            '   itemsPerPage={ {{itemsPerPage}} }\n' +
            '   onChange={(page) => console.log(\'Changed to page \' + page)}\n' +
            '/>', { itemsPerPage: itemsPerPage, numberOfItems: numberOfItems })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { Pagination } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-pagination</code></Normaltekst>

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
              <td>numberOfItems</td>
              <td><code>number</code></td>
              <td>true</td>
              <td>Total number of items, in order to calculate how many pages are needed</td>
              <td>-</td>
            </tr>
            <tr>
              <td>initialPage</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Initial page to view when the component mounts</td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td>itemsPerPage</td>
              <td><code>number</code></td>
              <td>true</td>
              <td>Sets the number of items per page, in order to calculate how many pages are needed</td>
              <td>-</td>
            </tr>
            <tr>
              <td>maxPageButtons</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Sets the maximum number of visible page buttons (excluding arrows)</td>
              <td><code>9</code></td>
            </tr>
            <tr>
              <td>onChange</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function for any page button click, and the targeted page as a parameter</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default PaginationPage
