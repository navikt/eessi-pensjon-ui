import React from 'react'
import Container from './Container'
import CountrySelect from '../components/CountrySelect/CountrySelect'
import CountryFilter from '../components/CountrySelect/CountryFilter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const CountryUtilsPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Country utils</Systemtittel>
        <Normaltekst>Assorted utils for county lists.</Normaltekst>

        <Undertittel className='pt-4 pb-4'>Country Select</Undertittel>
        <Normaltekst className='pb-4'>Select component for country elements</Normaltekst>

        <CountrySelect
          className='w-50'
          onSelect={(country) => window.alert('You selected ' + JSON.stringify(country))}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          'onSelect={(country) => window.alert(\'You selected \' + JSON.stringify(country))}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with error message</Undertittel>

        <CountrySelect
          className='w-50'
          error='Please choose a country'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          'error=\'Please choose a country\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with include and exclude lists</Undertittel>
        <Normaltekst>You can either use just the include list (to set a list of selectable countries), an exclude list (to set all countries except a given list), or both list (filters the include list)</Normaltekst>
        <Normaltekst className='pb-4'>In the below example, the select options include all European Union countries that are not Nordic countries.</Normaltekst>
        <CountrySelect
          className='w-50'
          includeList={CountryFilter.EU}
          excludeList={CountryFilter.NORDIC}
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          'includeList={CountryFilter.EU}\n' +
          'excludeList={CountryFilter.NORDIC}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Currency Select</Undertittel>
        <Normaltekst className='pb-4'>You can have a currency select</Normaltekst>
        <CountrySelect
          className='w-50'
          type='currency'
        />

        <SyntaxHighlighter language='javascript' style={prism}>
          {'<CountrySelect \n' +
          'type=\'currency\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Filter</Undertittel>
        <Normaltekst className='pb-4'>Country Filter is a collection of predefined groups of countries:</Normaltekst>
        <ul>
          <li>EEA - <a href='https://en.wikipedia.org/wiki/European_Economic_Area'>European Economic Area countries</a></li>
          <li>EU - <a href='https://en.wikipedia.org/wiki/European_Union'>European Union countries</a></li>
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
              <td>If given, shows an error message and error style</td>
              <td>-</td>
            </tr>
            <tr>
              <td>excludeList</td>
              <td>list</td>
              <td>false</td>
              <td>List of countries to be excluded from the option list</td>
              <td>-</td>
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
              <td>list</td>
              <td>false</td>
              <td>List of countries chosen to be options</td>
              <td>-</td>
            </tr>
            <tr>
              <td>locale</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Locale of the select elements. Allowed values are 'en' and 'nb'</td>
              <td>nb</td>
            </tr>
            <tr>
              <td>onSelect</td>
              <td>function</td>
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
              <td>type</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Toggles between county select and currency select. Allowed values are 'country' and 'currency'</td>
              <td>country</td>
            </tr>
            <tr>
              <td>value</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Initial selected value (must be a two-letter country code, as in 'NO', case insensitive)</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default CountryUtilsPage
