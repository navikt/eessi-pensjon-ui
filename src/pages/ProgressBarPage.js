import React, { useState } from 'react'
import Container from './Container'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Input, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import Mustache from 'mustache'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const ProgressBarPage = () => {
  const [now, setNow] = useState(50)
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

        <ProgressBar now={now}>Loading... {now}%</ProgressBar>
        <SyntaxHighlighter language='javascript' style={prism}>
          {Mustache.render('<ProgressBar now={ {{now}} }>\n' +
           '  Loading... {{now}}%\n' +
          '</ProgressBar>', { now: now })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
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

export default ProgressBarPage
