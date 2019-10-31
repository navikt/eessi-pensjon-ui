import React, { useState } from 'react'
import Container from './Container'
import Flag from '../components/Flag/Flag'
import FlagList from '../components/Flag/FlagList'
import ReactTooltip from 'react-tooltip'
import CountryData from '../components/CountryData/CountryData'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import Mustache from 'mustache'
import { Input, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const FlagPage = () => {
  const [country, setCountry] = useState('no')
  let label = CountryData.findByValue('nb', country)
  label = label ? label.label : 'Unknown'
  console.log(label)
  return (
    <Container>
      <ReactTooltip place='top' type='dark' effect='solid' />
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Flag</Systemtittel>
        <Normaltekst>Flag component renders any world flag in SVG format.</Normaltekst>

        <Undertittel className='mt-4 mb-4'>Flag styles and sizes</Undertittel>
        <Normaltekst className='mt-4 mb-4'>At the moment, there is only two sizes: <strong>M</strong> and <strong>L</strong>, and two styles: <strong>circle</strong> and <strong>original</strong>.</Normaltekst>

        <Input className='w-25' label='Choose country' value={country} onChange={(e) => { setCountry(e.target.value) }} />
        <Normaltekst className='mt-4 mb-4'>Country: {label}</Normaltekst>
        <Flag country={country} label={label} size='M' type='original' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<Flag country=\'{{country}}\' label=\'{{label}}\' size=\'M\' type=\'original\'/>',
            { country: country, label: label })}
        </SyntaxHighlighter>

        <Flag country={country} label={label} size='L' type='original' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<Flag country=\'{{country}}\' label=\'{{label}}\' size=\'L\' type=\'original\'/>',
            { country: country, label: label })}
        </SyntaxHighlighter>

        <Flag country={country} label={label} size='M' type='circle' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<Flag country=\'{{country}}\' label=\'{{label}}\' size=\'M\' type=\'circle\'/>',
            { country: country, label: label })}
        </SyntaxHighlighter>

        <Flag country={country} label={label} size='L' type='circle' />
        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<Flag country=\'{{country}}\' label=\'{{label}}\' size=\'L\' type=\'circle\'/>',
            { country: country, label: label })}
        </SyntaxHighlighter>

        <Undertittel className='mt-4 mb-4'>Flag list</Undertittel>
        <Normaltekst className='mt-4 mb-4'>The <code>FlagList</code> component can render a list of flags, as follows.</Normaltekst>
        <Normaltekst className='mt-4 mb-4'><strong>Note</strong>: you need to add into your project the <code>ReactTooltip</code> component from the <code>react-tooltip</code> npm package in order to see the label tooltips.</Normaltekst>
        <FlagList
          items={[
            { country: 'no', label: 'Norway' },
            { country: 'se', label: 'Sweden' },
            { country: 'dk', label: 'Denmark' },
            { country: 'fi', label: 'Finland' }
          ]} size='M' type='circle'
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<FlagList\n' +
          '  items={[\n' +
          '    {country: \'no\', label: \'Norway\'},\n' +
          '    {country: \'se\', label: \'Sweden\'},\n' +
          '    {country: \'dk\', label: \'Denmark\'},\n' +
          '    {country: \'fi\', label: \'Finland\'},\n' +
          '  ]}\n' +
          '  size=\'M\'\n' +
          '  type=\'circle\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Normaltekst className='pt-4 pb-4'>We can set an overflow limit to the flag list.</Normaltekst>

        <FlagList
          overflowLimit={2}
          items={[
            { country: 'no', label: 'Norway' },
            { country: 'se', label: 'Sweden' },
            { country: 'dk', label: 'Denmark' },
            { country: 'fi', label: 'Finland' }
          ]} size='M' type='circle'
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {' <FlagList \n' +
          '  overflowLimit={2}\n' +
          '  items={[\n' +
          '    {country: \'no\', label: \'Norway\'},\n' +
          '    {country: \'se\', label: \'Sweden\'},\n' +
          '    {country: \'dk\', label: \'Denmark\'},\n' +
          '    {country: \'fi\', label: \'Finland\'},\n' +
          '  ]}\n' +
          '  size=\'M\'\n' +
          '  type=\'circle\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='mt-4 mb-4'>Available flags - rectangle form</Undertittel>
        <Normaltekst className='mt-4 mb-4'>Use the two-letter country code for country list. Hover the mouser cursor over the desired flag to get the country code.</Normaltekst>

        <div className='d-flex flex-wrap' style={{ justifyContent: 'space-evenly' }}>
          {CountryData.getData('nb').map((country, index) => (
            <Flag key={index} className='m-1' country={country.value} label={country.label + ' - ' + country.value} />
          ))}
        </div>

        <Undertittel className='mt-4 mb-4'>Available flags - circle form</Undertittel>

        <div className='d-flex flex-wrap' style={{ justifyContent: 'space-evenly' }}>
          {CountryData.getData('nb').map((country, index) => (
            <Flag type='circle' key={index} className='m-1' country={country.value} label={country.label + ' - ' + country.value} />
          ))}
        </div>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
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
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default FlagPage
