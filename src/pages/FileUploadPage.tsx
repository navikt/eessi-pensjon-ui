import { PageProps } from 'pages/index'
import React from 'react'
import { State } from 'reducer'
import Container from './Container'
import FileUpload from 'components/FileUpload/FileUpload'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const FileUploadPage: React.FC<PageProps> = (): JSX.Element => {
  const highContrast = useSelector<State>(state => state.highContrast)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>File Upload</Systemtittel>
        <Normaltekst className='mt-4 mb-4'>File upload component with drag and drop capability, compatible with mobile
          devices.
        </Normaltekst>
        <Undertittel className='pt-4 mb-4'>File Upload with initial file list</Undertittel>
        <Normaltekst className='mt-4 mb-4'>Either drag and drop more files into the drop area, or click on the drop area
          to open the file selection dialog.
        </Normaltekst>
        <Normaltekst className='mt-4 mb-4'>Note that the already uploaded files have context buttons when
          hover.
        </Normaltekst>
        <FileUpload
          className='w-75 mb-4' files={[
            require('resources/tests/samplePDF').default,
            require('resources/tests/sampleJPG').default,
            require('resources/tests/sampleOther').default
          ]}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<FileUpload files={[\n' +
          '  require(\'../resources/tests/samplePDF\').default, \n' +
          '  require(\'../resources/tests/sampleJPG\').default,\n' +
          '  require(\'../resources/tests/sampleOther\').default\n' +
          ']}/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>File Upload with restricted mimetypes, max file size, max number
          files
        </Undertittel>

        <FileUpload
          className='w-75  mb-4'
          acceptedMimetypes={['application/pdf']}
          maxFileSize={500000}
          maxFiles={1}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<FileUpload\n' +
          '  acceptedMimetypes={[\'application/pdf\']}\n' +
          '  maxFileSize={500000}\n' +
          '  maxFiles={1}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>File Upload callback functions</Undertittel>

        <FileUpload
          className='w-75  mb-4'
          beforeFileDrop={() => window.alert('Before drop')}
          afterFileDrop={() => window.alert('After drop')}
          onFilesChanged={(files) => window.alert('I have ' + files.length + ' files')}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<FileUpload \n' +
          '  beforeFileDrop={() => console.log(\'Before drop\')}\n' +
          '  afterFileDrop={() => console.log(\'After drop\')}\n' +
          '  onFilesChanged={(files) => console.log(\'I have \' + files.length + \' files\')}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Image file</Undertittel>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td><code>string</code> or <code>list</code></td>
              <td>false</td>
              <td>String with accepted mimetype or list of accepted mimetypes. If not defined, all files are accepted.
              </td>
              <td>-</td>
            </tr>
            <tr>
              <td>afterFileDrop</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered after file drop.</td>
              <td>-</td>
            </tr>
            <tr>
              <td>beforeFileDrop</td>
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
              <td>List of optional labels that override the default labels</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>maxFiles</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Maximum number of allowed files</td>
              <td>99</td>
            </tr>
            <tr>
              <td>maxFileSize</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Maximum size of acceptable files, in bytes. Default value is 10 MB.</td>
              <td>10485760</td>
            </tr>
            <tr>
              <td>onFilesChanged</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the uploaded file list changes</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default FileUploadPage
