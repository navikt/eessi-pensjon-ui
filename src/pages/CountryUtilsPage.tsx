import { AllowedLocaleString } from 'components/CountryData/CountryData'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'reducer'
import Container from './Container'
import CountrySelect from 'components/CountrySelect/CountrySelect'
import * as CountryFilter from 'components/CountrySelect/CountryFilter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import Mustache from 'mustache'
import { Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const CountryUtilsPage: React.FC<PageProps> = (): JSX.Element => {
  const [sort, setSort] = useState<string>('scandinaviaFirst')
  const [lang, setLang] = useState<AllowedLocaleString>('en')
  const highContrast = useSelector<State>(state => state.highContrast)
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
        <Normaltekst className='pt-4 pb-4'>This is the standard select component with default options.
          You can set locale to either 'en' (English) or 'nb' (Norsk bokmål - default)
        </Normaltekst>
        <Select
          className='w-25'
          label='Choose language'
          value={lang}
          onChange={(e) => setLang(e.target.value as AllowedLocaleString)}
        >
          <option>en</option>
          <option>nb</option>
        </Select>
        <CountrySelect
          id='standard-country-select'
          className='w-50'
          label='Standard country select'
          ariaLabel='Standard country select'
          locale={lang}
          error={undefined}
          onOptionSelected={(country) => window.alert('You selected ' + JSON.stringify(country))}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<CountrySelect \n' +
          '  label=\'Standard country select\'\n' +
          '  ariaLabel=\'Standard country select\'\n' +
          '  lang=\'{{lang}}\' \n' +
          '  onOptionSelected={(country) => window.alert(\'You selected \' + JSON.stringify(country))}\n' +
          '/>', { lang: lang })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with error message</Undertittel>
        <Normaltekst className='pb-4'>In case you want to make the component mandatory, you can set an error message in the same style as the NAV designsystem components</Normaltekst>
        <CountrySelect
          id='standard-country-select-2'
          label='Country select with error message'
          ariaLabel='Country select with error message'
          className='w-50'
          locale={lang}
          error='Please choose a country'
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<CountrySelect \n' +
          '  label=\'Country select with error message\'\n' +
          '  ariaLabel=\'Country select with error message\'\n' +
          '  error=\'Please choose a country\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with include and exclude lists</Undertittel>
        <Normaltekst>You can either add an <strong>include list</strong> (to set a list of selectable countries), an <strong>exclude list</strong> (to set all countries except a given list), or <strong>both lists</strong> (that is, an exclude filter over the include list)</Normaltekst>
        <Normaltekst className='pb-4'>In the below example, the select options include all European Union countries that are not Nordic countries.</Normaltekst>
        <CountrySelect
          id='standard-country-select-3'
          className='w-50'
          locale={lang}
          label='Country select with include / exclude list'
          ariaLabel='Country select with include / exclude list'
          includeList={CountryFilter.EU}
          excludeList={CountryFilter.NORDIC}
          error={undefined}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<CountrySelect \n' +
          '  label=\'Country select with include / exclude list\'\n' +
          '  ariaLabel=\'Country select with include / exclude list\'\n' +
          '  includeList={CountryFilter.EU}\n' +
          '  excludeList={CountryFilter.NORDIC}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Select with no flags</Undertittel>
        <Normaltekst className='pb-4'>You can remove flag displays from the select options and current select value</Normaltekst>
        <CountrySelect
          id='standard-country-select-4'
          className='w-50'
          label='Country select without flags'
          ariaLabel='Country select without flags'
          flags={false}
          locale={lang}
          error={undefined}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<CountrySelect \n' +
          '  label=\'Country select without flags\'\n' +
          '  ariaLabel=\'Country select without flags\'\n' +
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
          id='standard-country-select-5'
          className='w-50'
          label='Country select with sorting option'
          ariaLabel='Country select with sorting option'
          locale={lang}
          sort={sort}
          error={undefined}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<CountrySelect \n' +
          '  label=\'Country select with sorting option\'\n' +
          '  ariaLabel=\'Country select with sorting option\'\n' +
          '  sort=\'{{sort}}\'\n' +
          '/>', { sort: sort })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Currency Select</Undertittel>
        <Normaltekst className='pb-4'>You can have a currency select instead of a country select, by changing the <code>type</code> property to <code>currency</code></Normaltekst>
        <CountrySelect
          id='standard-country-select-6'
          label='Currency select'
          ariaLabel='Currency select'
          className='w-50'
          type='currency'
          locale={lang}
          error={undefined}
        />

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<CountrySelect \n' +
          '  label=\'Currency select\'\n' +
          '  ariaLabel=\'Currency select\'\n ' +
          '  type=\'currency\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Country Filter</Undertittel>
        <Normaltekst className='pb-4'>Country Filter is a collection of predefined groups of countries:</Normaltekst>
        <ul>
          <li>EEA - The <a href='https://en.wikipedia.org/wiki/European_Economic_Area'>European Economic Area countries</a>, that is, EU countries plus Switzerland, Faroe islands, Greenland, Iceland, Liechtenstein and Norway</li>
          <li>EESSI_READY - The countries that are ESSSI-compliant</li>
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
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td>label</td>
              <td><code>node</code>, <code>string</code></td>
              <td>true</td>
              <td>Element's label</td>
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