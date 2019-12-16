import React, { useState } from 'react'
import Container from './Container'
import ProgressBar from 'components/ProgressBar/ProgressBar'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { connect } from '../store'
import { Input, Normaltekst, Panel, Select, Systemtittel, Undertittel } from '../Nav'
import Mustache from 'mustache'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state) => ({ highContrast: state.highContrast })

const ProgressBarPage = ({ highContrast }) => {
  const [now, setNow] = useState(50)
  const [status, setStatus] = useState('inprogress')
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>Progress bar </Systemtittel>
        <Normaltekst className='mt-4 mb-4'>This component renders an animated progress bar with custom text inside</Normaltekst>

        <Input
          className='w-25' label='Progress bar percentage' type='number' min={0} max={100} value={now} onChange={(e) => {
            setNow(parseInt(e.target.value, 10))
          }}
        />

        <Select className='w-25' label='Choose status' value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>todo</option>
          <option>inprogress</option>
          <option>done</option>
          <option>error</option>
        </Select>
        <ProgressBar
          status={status}
          now={now}
        >
          Loading... {now}%
        </ProgressBar>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<ProgressBar now={ {{now}} } status=\'{{stauts}}\'>\n' +
           '  Loading... {{now}}%\n' +
          '</ProgressBar>', { now: now, status: status })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { ProgressBar } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-progressbar</code></Normaltekst>

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
              <td>now</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Progress number between 0 and 100</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(ProgressBarPage)
