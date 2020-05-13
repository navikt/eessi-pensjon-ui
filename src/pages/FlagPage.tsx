import { Country } from 'declarations/components'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'reducer'
import Container from './Container'
import Flag from 'components/Flag/Flag'
import FlagList from 'components/Flag/FlagList'
import CountryData from 'components/CountryData/CountryData'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import Mustache from 'mustache'
import { Input, Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

type SizeType = 'S' | 'M' | 'L' | 'XL'

const FlagPage: React.FC<PageProps> = (): JSX.Element => {
  const [country, setCountry] = useState('no')
  const [size, setSize] = useState<SizeType>('M')
  let label = CountryData.getCountryInstance('nb').findByValue(country)
  label = label ? label.label : 'Unknown'
  const highContrast = useSelector<State>(state => state.highContrast)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Flag</Systemtittel>
        <Normaltekst>Flag component renders any world flag in SVG format.</Normaltekst>

        <Undertittel className='mt-4 mb-4'>Flag styles and sizes</Undertittel>
        <Normaltekst className='mt-4 mb-4'>At the moment, there is only two sizes: <strong>M</strong> and <strong>L</strong>, and two styles: <strong>circle</strong> and <strong>original</strong>.</Normaltekst>

        <div className='d-flex'>
          <Input className='w-25 mr-3' label='Choose country' value={country} onChange={(e) => { setCountry(e.target.value) }} />
          <Select className='w-25' label='Choose size' value={size} onChange={(e) => { setSize(e.target.value as SizeType) }}>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </Select>
        </div>

        <Normaltekst className='mb-4'>Country: {label}</Normaltekst>
        <Flag className='mb-4' country={country} label={label} size={size} type='original' />
        <SyntaxHighlighter className='mb-4' language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<Flag country=\'{{country}}\' label=\'{{label}}\' size=\'{{size}}\' type=\'original\'/>',
            { country: country, label: label, size: size })}
        </SyntaxHighlighter>

        <Flag className='mb-4' country={country} label={label} size={size} type='circle' />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<Flag country=\'{{country}}\' label=\'{{label}}\' size=\'{{size}}\' type=\'circle\'/>',
            { country: country, label: label, size: size })}
        </SyntaxHighlighter>

        <Undertittel className='mt-4 mb-4'>Flag list</Undertittel>
        <Normaltekst className='mt-4 mb-4'>The <code>FlagList</code> component can render a list of flags, as follows.</Normaltekst>
        <FlagList
          className='mb-4'
          items={[
            { country: 'no', label: 'Norway' },
            { country: 'se', label: 'Sweden' },
            { country: 'dk', label: 'Denmark' },
            { country: 'fi', label: 'Finland' }
          ]} size={size} type='circle'
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<FlagList\n' +
          '  items={[\n' +
          '    {country: \'no\', label: \'Norway\'},\n' +
          '    {country: \'se\', label: \'Sweden\'},\n' +
          '    {country: \'dk\', label: \'Denmark\'},\n' +
          '    {country: \'fi\', label: \'Finland\'},\n' +
          '  ]}\n' +
          '  size=\'{{size}}\'\n' +
          '  type=\'circle\'\n' +
          '/>', { size: size })}
        </SyntaxHighlighter>

        <Normaltekst className='pt-4 pb-4'>We can set an overflow limit to the flag list.</Normaltekst>

        <FlagList
          className='mb-4'
          overflowLimit={2}
          items={[
            { country: 'no', label: 'Norway' },
            { country: 'se', label: 'Sweden' },
            { country: 'dk', label: 'Denmark' },
            { country: 'fi', label: 'Finland' }
          ]} size={size} type='circle'
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render(' <FlagList \n' +
          '  overflowLimit={2}\n' +
          '  items={[\n' +
          '    {country: \'no\', label: \'Norway\'},\n' +
          '    {country: \'se\', label: \'Sweden\'},\n' +
          '    {country: \'dk\', label: \'Denmark\'},\n' +
          '    {country: \'fi\', label: \'Finland\'},\n' +
          '  ]}\n' +
          '  size=\'{{size}}\'\n' +
          '  type=\'circle\'\n' +
          '/>', { size: size })}
        </SyntaxHighlighter>

        <Undertittel className='mt-4 mb-4'>Available flags - rectangle form</Undertittel>
        <Normaltekst className='mt-4 mb-4'>Use the two-letter country code for country list. Hover the mouser cursor over the desired flag to get the country code.</Normaltekst>

        <div className='flex-wrap' style={{ justifyContent: 'space-evenly' }}>
          <FlagList
            className='mb-4'
            wrap
            overflowLimit={999}
            items={CountryData.getCountryInstance('nb').getData().map((it: Country) => {
              console.log(it)
              return { country: it.value, label: it.label + ' - ' + it.value }
            }
            )}
            size={size}
          />
        </div>

        <Undertittel className='mt-4 mb-4'>Available flags - circle form</Undertittel>
        <FlagList
          className='mb-4'
          wrap
          overflowLimit={999}
          items={CountryData.getCountryInstance('nb').getData().map((it: Country) => ({ country: it.value, label: it.label + ' - ' + it.value })
          )}
          size={size}
          type='circle'
        />

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { Flag } from \'eessi-pensjon-ui\'\n' +
          'import { FlagList } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-flag</code>, <code>c-flaglist</code></Normaltekst>

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
              <td>country</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Flag's 2-letter country code (for <code>Flag</code> component only)</td>
              <td>-</td>
            </tr>
            <tr>
              <td>items</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>Country list with keys <code>country</code> and <code>label</code> (for <code>FlagList</code> component only)</td>
              <td>-</td>
            </tr>
            <tr>
              <td>label</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>flag's tooltip label (for <code>Flag</code> component only)</td>
              <td>-</td>
            </tr>
            <tr>
              <td>locale</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Flag label's locale -- valid options are <code>en</code> (English) and <code>nb</code> (Norsk Bokmål)</td>
              <td>nb</td>
            </tr>
            <tr>
              <td>overflowLimit</td>
              <td><code>number</code></td>
              <td>true</td>
              <td>Max limit of flags shown for a flag list (for <code>FlagList</code> component only)</td>
              <td>-</td>
            </tr>
            <tr>
              <td>size</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Flag size. Accepted values: <code>M</code> and <code>L</code>.</td>
              <td>M</td>
            </tr>
            <tr>
              <td>type</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Flag type. Accepted values: <code>original</code> and <code>circle</code>.</td>
              <td>original</td>
            </tr>
            <tr>
              <td>wrap</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Toggle for wrapping flags or keeping them in one line  (for <code>FlagList</code> component only).</td>
              <td>false</td>
            </tr>
            <tr>
              <td>wrapper</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Adding a wrapper div around flag icons or not (for <code>FlagList</code> component only).</td>
              <td>true</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default FlagPage
