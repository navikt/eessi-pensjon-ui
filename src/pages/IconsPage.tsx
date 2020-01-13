import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'declarations/types'
import Container from './Container'
import Icons, { availableIcons } from 'components/Icons/Icons'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { connect } from '../store'
import Mustache from 'mustache'
import { Input, Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
import ReactTooltip from 'react-tooltip'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state: State) => ({ highContrast: state.highContrast })

const IconsPage: React.FC<PageProps> = ({ highContrast }: PageProps): JSX.Element => {
  const [color, setColor] = useState<string>('black')
  const [size, setSize] = useState<number>(48)
  return (
    <Container>
      <ReactTooltip place='top' type='dark' effect='solid' />
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>Icons</Systemtittel>
        <Normaltekst className='mt-4 mb-4'>Icon component that combines icons from <code>FontAwesome</code> and external SVG icons from NAV Ikoner DB</Normaltekst>

        <Input className='w-50' value={color} label='Set color' onChange={(e) => setColor(e.target.value)} />
        <Select className='w-50' value={size} label='Set size' onChange={(e) => setSize(parseInt(e.target.value, 10))}>
          <option>32</option>
          <option>48</option>
          <option>64</option>
          <option>96</option>
          <option>128</option>
        </Select>
        <div className='d-flex flex-wrap' style={{ justifyContent: 'space-evenly' }}>
          {availableIcons.map(kind => (
            <Icons className='p-2' key={kind} kind={kind} size={size} data-tip={kind} color={color} />
          ))}
        </div>

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('availableIcons.map(kind => (\n' +
          '   <Icons\n' +
          '     className=\'p-2\'\n' +
          '     kind={kind}\n' +
          '     size={ {{size}} }\n' +
          '     data-tip={kind}\n' +
          '     color={ {{color}} }\n' +
          '   />\n' +
          '))', { color: color, size: size })}
        </SyntaxHighlighter>
        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { Icons } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>

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
              <td>kind</td>
              <td><code>string</code></td>
              <td>true</td>
              <td>Icon kind</td>
              <td>-</td>
            </tr>
            <tr>
              <td>size</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Icon size</td>
              <td>24</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(IconsPage)
