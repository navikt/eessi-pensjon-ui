import React from 'react'
import Container from './Container'
import FileUpload from '../components/FileUpload/FileUpload'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const FileUploadPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>File Upload</Systemtittel>
        <Normaltekst>File upload utility, with drag & drop, and mimetype / size limits</Normaltekst>

        <Undertittel className='pt-4 pb-4'>File Upload with initial file list</Undertittel>
        <FileUpload files={[
          require('../resources/tests/samplePDF').default,
          require('../resources/tests/sampleJPG').default,
          require('../resources/tests/sampleOther').default
        ]}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<FileUpload files={[\n' +
          '  require(\'../resources/tests/samplePDF\').default, \n' +
          '  require(\'../resources/tests/sampleJPG\').default,\n' +
          '  require(\'../resources/tests/sampleOther\').default\n' +
          ']}/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>File Upload with restricted mimetypes, max file size, max number files</Undertittel>

        <FileUpload acceptedMimetypes={['application/pdf']} maxFileSize={500000} maxFiles={1} />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<FileUpload acceptedMimetypes={[\'application/pdf\']} maxFileSize={500000} maxFiles={1}/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>File Upload callback functions</Undertittel>

        <FileUpload
          beforeDrop={() => window.alert('Before drop')}
          afterDrop={() => window.alert('After drop')}
          onFileChange={(files) => window.alert('I have ' + files.length + ' files')}
        />
        <SyntaxHighlighter language='javascript' style={prism}>
          {'<FileUpload \n' +
          'beforeDrop={() => window.alert(\'Before drop\')}\n' +
          'afterDrop={() => {window.alert(\'After drop\')}\n' +
          'onFileChange={(files) => window.alert(\'I have \' + files.length + \' files\')}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Image file</Undertittel>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { FileUpload } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-fileUpload</code></Normaltekst>

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
              <td>acceptedMimetypes</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List of accepted mimetypes. If not defined, all files are accepted.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>afterDrop</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered after file drop.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>beforeDrop</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered before file drop.</td>
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
              <td>currentPages</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List with the initial PDF page numbers to be rendered in the file upload area. If not given, the first page is rendered.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>files</td>
              <td><code>list</code></td>
              <td>false</td>
              <td>List of initial files in the file upload</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>labels</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>List of labels</td>
              <td>[]</td>
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

export default FileUploadPage

/* const FileUpload = ({
  , , , , ,  labels,
  maxFiles = 99, maxFileSize = 10485760, onFileChange, status, tabIndex
}) => { */
