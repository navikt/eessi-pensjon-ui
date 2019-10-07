import React from 'react'
import Container from './Container'
import File from '../components/File/File'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import samplePDF from '../resources/tests/samplePDF'
import sampleJPG from '../resources/tests/sampleJPG'
import sampleOther from '../resources/tests/sampleOther'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const FilePage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>File</Systemtittel>
        <Normaltekst>File rendering for GUI operations</Normaltekst>
        <ul>
          <li>PDF - Page browser, download/preview/delete buttons</li>
          <li>Image - download/preview/delete buttons</li>
          <li>Other - download/delete buttons</li>
        </ul>

        <Undertittel className='pt-4 pb-4'>PDF File</Undertittel>

        <div className='d-flex'>
          <File file={samplePDF} scale={2} />
          <div className='ml-4'>
            <SyntaxHighlighter language='javascript' style={prism}>
              {'<File file={samplePDF} scale={2}/>'}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='pt-4 pb-4'>Image file</Undertittel>

        <div className='d-flex'>
          <File file={sampleJPG} scale={3} />
          <div className='ml-4'>
            <SyntaxHighlighter language='javascript' style={prism}>
              {'<File file={sampleJPG} scale={3}/>'}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='pt-4 pb-4'>Other file</Undertittel>

        <div className='d-flex'>
          <File file={sampleOther} scale={1} />
          <div className='ml-4'>
            <SyntaxHighlighter language='javascript' style={prism}>
              {'<File file={sampleOther} scale={1}/>'}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { File } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-file</code></Normaltekst>

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
              <td>animate</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Animation in the file icon</td>
              <td>false</td>
            </tr>

            <tr>
              <td>file</td>
              <td><code>object</code></td>
              <td>true</td>
              <td>File object. Needs to have keys: name, mimetype, size, content (with base64 sub-key)</td>
              <td>-</td>
            </tr>
            <tr>
              <td>scale</td>
              <td>number</td>
              <td>false</td>
              <td>Scale of the file</td>
              <td>1.0</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default FilePage
