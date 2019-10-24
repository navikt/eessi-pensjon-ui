import React, { useState } from 'react'
import Container from './Container'
import CountrySelect from '../components/CountrySelect/CountrySelect'
import CountryFilter from '../components/CountrySelect/CountryFilter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import Mustache from 'mustache'
import { Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const CountryUtilsPage = () => {
  const [sort, setSort] = useState('scandinaviaFirst')
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Country utils</Systemtittel>
        <Normaltekst>Assorted utils for country lists, which includes:</Normaltekst>
        <ul className='pt-4'>
          <li><strong>CountrySelect</strong> - A React select component with a given group of countries (or currencies)</li>
          <li><strong>CountryData</strong> - An util class for country search, validation, data retrieval</li>
          <li><strong>CountryFilter</strong> - Pre-defined aliases of country groups, to use in <code>CountrySelect</code> option filters</li>
        </ul>
        <Undertittel className='pt-4 pb-4'>Country Select</Undertittel>
        <Normaltekst className='pb-4'>This is the standard select component with default options</Normaltekst>
        <CountrySelect
          className='w-50'
          onOptionSelected={(country) => window.alert('You selected ' + JSON.stringify(country))}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          '  onOptionSelected={(country) => window.alert(\'You selected \' + JSON.stringify(country))}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select, different locale</Undertittel>
        <Normaltekst className='pb-4'>You can set locale to either 'en' (English) or 'nb' (Norsk bokmål - default)</Normaltekst>
        <CountrySelect
          className='w-50'
          locale='en'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          '  locale=\'en\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with error message</Undertittel>
        <Normaltekst className='pb-4'>In case you want to make the component mandatory, you can set an error message in the same style as the NAV designsystem components</Normaltekst>
        <CountrySelect
          className='w-50'
          error='Please choose a country'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          '  error=\'Please choose a country\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with include and exclude lists</Undertittel>
        <Normaltekst>You can either add an <strong>include list</strong> (to set a list of selectable countries), an <strong>exclude list</strong> (to set all countries except a given list), or <strong>both lists</strong> (that is, an exclude filter over the include list)</Normaltekst>
        <Normaltekst className='pb-4'>In the below example, the select options include all European Union countries that are not Nordic countries.</Normaltekst>
        <CountrySelect
          className='w-50'
          includeList={CountryFilter.EU}
          excludeList={CountryFilter.NORDIC}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          '  includeList={CountryFilter.EU}\n' +
          '  excludeList={CountryFilter.NORDIC}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with no flags</Undertittel>
        <Normaltekst className='pb-4'>You can remove flag displays from the select options and current select value</Normaltekst>
        <CountrySelect
          className='w-50'
          flags={false}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          '  flags={false}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Options sorting</Undertittel>
        <Normaltekst>Sort property can be one of types <code>asc</code>, <code>desc</code> or <code>scandinaviaFirst</code>. </Normaltekst>
        <Normaltekst><code>asc</code> and <code>desc</code> does alphabetically sort using country labels.</Normaltekst>
        <Normaltekst className='pb-4'><code>scandinaviaFirst</code> puts Scandinavian countries on top of the list first. </Normaltekst>
        <Select
          label='Sort value'
          className='w-25'
          onChange={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setSort(e.target.value)
          }}
        >
          <option value='scandinaviaFirst'>Scandinavia first</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </Select>

        <CountrySelect
          className='w-50'
          sort={sort}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<CountrySelect \n' +
          '  sort=\'{{sort}}\'\n' +
          '/>', { sort: sort })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Currency Select</Undertittel>
        <Normaltekst className='pb-4'>You can have a currency select instead of a country select, by changing the <code>type</code> property to <code>currency</code></Normaltekst>
        <CountrySelect
          className='w-50'
          type='currency'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          '  type=\'currency\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Filter</Undertittel>
        <Normaltekst className='pb-4'>Country Filter is a collection of predefined groups of countries:</Normaltekst>
        <ul>
          <li>EEA - The <a href='https://en.wikipedia.org/wiki/European_Economic_Area'>European Economic Area countries</a>, that is, EU countries plus Switzerland, Faroe islands, Greenland, Iceland, Liechtenstein and Norway</li>
          <li>EU - All 28 <a href='https://en.wikipedia.org/wiki/European_Union'>European Union countries</a></li>
          <li>NO - <a href='https://en.wikipedia.org/wiki/Norway'>Norway</a> only</li>
          <li>NORDIC - <a href='https://en.wikipedia.org/wiki/Nordic_countries'>Nordic countries</a>: Denmark, Finland, Faroe islands, Greenland, Iceland, Norway, Sweden</li>
          <li>SCANDINAVIA - <a href='https://en.wikipedia.org/wiki/Scandinavia'>Scandinavia countries</a>: Denmark, Norway, Sweden</li>
        </ul>

        <Undertittel className='pt-4 pb-4'>Country Data</Undertittel>
        <Normaltekst>Country Data is auxiliary class that contains the country database.</Normaltekst>
        <Normaltekst>Normally you don't need to use this class for React Component import, but for advanced usage, you might want to have a look at the source code. </Normaltekst>
        <Normaltekst className='pb-4'>Class methods include:</Normaltekst>
        <ul>
          <li> <code>getData(locale)</code> - Get country data for a given locale (en or nb)</li>
          <li> <code>findByValue(locale, value)</code> - Find a country, as in findByValue('nb', 'no')</li>
          <li> <code>findByValue3(locale, value)</code> - Find a country by the 3 letter code, as in findByValue('nb', 'nor')</li>
          <li> <code>exists(country)</code> - check if a certain country code exists in the database, as in exists('xx')</li>
          <li> <code>filterByValueOnArray(locale, countries)</code> - same as findByValue, but it takes a list as argument, and returns a list of found countries</li>
        </ul>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { CountrySelect } from \'eessi-pensjon-ui\'\n' +
          'import { CountryData } from \'eessi-pensjon-ui\'\n' +
          'import { CountryFilter } from \'eessi-pensjon-ui\'\n'}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-countrySelect</code></Normaltekst>
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
              <td>error</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>If given, shows an error messagein NAV designsystem style</td>
              <td>-</td>
            </tr>
            <tr>
              <td>excludeList</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List of countries to be excluded from the option list</td>
              <td>-</td>
            </tr>
            <tr>
              <td>flags</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Display flags on select options and selected value</td>
              <td>true</td>
            </tr>
            <tr>
              <td>id</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Element ID to be passed down to options list</td>
              <td>-</td>
            </tr>
            <tr>
              <td>includeList</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List of countries chosen to be options</td>
              <td>-</td>
            </tr>
            <tr>
              <td>locale</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Locale of the select elements. Allowed values are <code>en</code> (English) and <code>nb</code> (Norsk Bokmål)</td>
              <td>nb</td>
            </tr>
            <tr>
              <td>onOptionSelected</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Function to be called with the selected option</td>
              <td>-</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Placeholder text to display when the select box is empty</td>
              <td>-</td>
            </tr>
            <tr>
              <td>sort</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Sorting country options. Property can be one of types:
                <ul>
                  <li><code>asc</code>, for ascending order</li>
                  <li><code>desc</code>, for descending order</li>
                  <li><code>scandinaviaFirst</code>, for scandinavian countries on top</li>
                </ul>
              </td>
              <td>scandinaviaFirst</td>
            </tr>
            <tr>
              <td>type</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Toggles between county select and currency select. Allowed values are <code>country</code> and <code>currency</code></td>
              <td>country</td>
            </tr>
            <tr>
              <td>value</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Initial selected value (must be a two-letter country code, as in 'NO') - case insensitive</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default CountryUtilsPage
