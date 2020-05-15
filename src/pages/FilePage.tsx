import Mustache from 'mustache'
import { Checkbox, Select } from 'Nav'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'reducer'
import Container from './Container'
import File from 'forhandsvisningsfil'
import { File as IFile } from 'forhandsvisningsfil/lib/forhandsvisningsfil.d'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import samplePDF from 'resources/tests/samplePDF'
import sampleJPG from 'resources/tests/sampleJPG'
import sampleOther from 'resources/tests/sampleOther'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const FilePage: React.FC<PageProps> = (): JSX.Element => {
  const highContrast = useSelector<State>(state => state.highContrast)
  const [buttonsPosition, setButtonsPosition] = useState<'inside' | 'header'>('inside')
  const [buttonsVisibility, setButtonsVisibility] = useState<'always' | 'hover' | 'none'>('always')
  const [viewOnePage, setViewOnePage] = useState<boolean>(true)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>File component</Systemtittel>
        <Normaltekst>File component renders a given file, so it can be used in GUI operations such as drag and drop,
          preview, page browsing, etc.
        </Normaltekst>
        <ul className='mt-4 mb-4'>
          <li>PDF - Renders a PDF page (browsable), can add optional download/preview/delete buttons</li>
          <li>Image - Renders the image, can add optional download/preview/delete buttons</li>
          <li>Other - Renders a file placeholder, with optional download/delete buttons</li>
        </ul>
        <Normaltekst>The <code>file</code> prop has to be a JavaScript <code>object</code> with keys: </Normaltekst>
        <ul className='mt-4 mb-4'>
          <li><code>id</code> - an identification ID (optional)</li>
          <li><code>name</code> - For the file name (mandatory)</li>
          <li><code>mimetype</code> - For the mimetype (mandatory)</li>
          <li><code>size</code> - For the file size (optional)</li>
          <li><code>numPages</code> - Number of pages (optional)</li>
          <li><code>content</code> - An <code>object</code> with a <code>base64</code>key in it (mandatory),</li>
        </ul>
        <Normaltekst>An example of a <code>file</code> object property: </Normaltekst>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'{\n' +
          '  id: \'1\',\n' +
          '  name: \'example.pdf\',\n' +
          '  mimetype: \'application/pdf\',\n' +
          '  numPages: 5,\n' +
          '  size: 12834,\n' +
          '  content: {\n' +
          '    base64: \'JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYm(...)\'\n' +
          '  }\n' +
          '}'}
        </SyntaxHighlighter>

        <Undertittel className='mt-4 mb-4'>PDF File</Undertittel>

        <div className='d-flex'>
          <div className='w-33'>
            <File file={samplePDF} scale={2} />
          </div>
          <div className='w-66 ml-4'>
            <Normaltekst>PDF file renders a page with a default width/height and a folded-corner style. </Normaltekst>
            <Normaltekst className='mt-4 mb-4'>If the PDF file has additional pages, one can see arrows in the sides of
              the page, when the mouse hovers the page.
            </Normaltekst>
            <Normaltekst className='mt-4 mb-4'>While you can override <code>width</code> and <code>height</code> params,
              it is easier to set a <code>scale</code> value (scale 1.0 matches a width of 100px and height of 140 px).
            </Normaltekst>
            <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
              {'<File file={samplePDF} scale={2}/>'}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='mt-4 mb-4'>Image file</Undertittel>

        <div className='d-flex'>
          <div className='w-33'>
            <File
              file={sampleJPG} buttonsVisibility='always'
              buttonsPosition='header' showDownloadButton scale={1.5}
            />
          </div>
          <div className='w-66 ml-4'>
            <Normaltekst className='mb-4'>Image file renders the base64 content of an image with a
              fixed <code>max-height</code> given my <code>height</code> property (with defaylt 100px as a scale 1.0).
            </Normaltekst>
            <Normaltekst className='mt-4 mb-4'>Like the PDF file, you can use the <code>scale</code> property to set the
              image size while preserving the aspect ratio
            </Normaltekst>
            <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
              {'<File file={sampleJPG} scale={1.5}/>'}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='pt-4 pb-4'>Other file</Undertittel>

        <div className='d-flex'>
          <div className='w-33'>
            <File file={sampleOther} scale={1.5} />
          </div>
          <div className='w-66 ml-4'>
            <Normaltekst className='mb-4'>Other files renders as a blank page with is extension (derived from filename)
              as the center title.
            </Normaltekst>
            <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
              {'<File file={sampleOther} scale={1.5}/>'}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='pt-4 pb-4'>File context buttons</Undertittel>

        <Normaltekst>PDF file renders a page with a default width/height and a folded-corner style. </Normaltekst>
        <Normaltekst className='mt-4 mb-4'>If the PDF file has additional pages, one can see arrows in the sides of the
          page, when the mouse hovers the page.
        </Normaltekst>
        <Normaltekst className='mt-4 mb-4'>While you can override <code>width</code> and <code>height</code> params, it
          is easier to set a <code>scale</code> value (scale 1.0 matches a width of 100px and height of 140 px).
        </Normaltekst>

        <div className='mb-4 d-flex flex-row align-items-center'>
          <Select
            className='w-25 mr-3'
            label='Buttons position'
            value={buttonsPosition}
            onChange={(e) => setButtonsPosition(e.target.value as 'inside' | 'header')}
          >
            <option>inside</option>
            <option>header</option>
          </Select>
          <Select
            className='w-25 mr-3'
            label='Buttons visibility'
            value={buttonsVisibility}
            onChange={(e) => setButtonsVisibility(e.target.value as 'always' | 'hover' |'none')}
          >
            <option>always</option>
            <option>hover</option>
            <option>none</option>
          </Select>
          <Checkbox
            className='w-25'
            label='view one Page'
            checked={viewOnePage}
            onChange={() => setViewOnePage(!viewOnePage)}
          />
        </div>

        <div className='d-flex'>
          <div className='w-33'>
            <File
              file={samplePDF}
              buttonsVisibility={buttonsVisibility!}
              buttonsPosition={buttonsPosition!}
              viewOnePage={viewOnePage}
              initialPage={2}
              showAddButton
              showDeleteButton
              showDownloadButton
              showPreviewButton
              onAddFile={(file: IFile) => console.log('onAddFile: ', file)}
              onDeleteFile={(file: IFile) => console.log('onDeleteFile: ', file)}
              onDownloadFile={(file: IFile) => console.log('onDownloadFile: ', file)}
              onPreviewFile={(file: IFile) => console.log('onPreviewFile: ', file)}
              onContentClick={(file: IFile) => console.log('onContentClick: ', file)}
              onPreviousPage={(file: IFile) => console.log('onPreviousPage: ', file)}
              onNextPage={(file: IFile) => console.log('onNextPage: ', file)}
              scale={2}
            />
          </div>
          <div className='w-66 ml-4'>
            <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
              {Mustache.render('<File \n' +
              '  file={samplePDF}\n' +
              '  buttonsVisibility=\'{{buttonsVisibility}}\'\n' +
              '  buttonsPosition=\'{{buttonsPosition}}\'\n' +
              '  viewOnePage={{viewOnePage}}\n' +
              '  initialPage={2}\n' +
              '  showAddButton\n' +
              '  showDeleteButton\n' +
              '  showDownloadButton\n' +
              '  showPreviewButton\n' +
              '  onAddFile={(file) => console.log(\'onAddFile: \', file)}\n' +
              '  onDeleteFile={(file) => console.log(\'onDeleteFile: \', file)}\n' +
              '  onDownloadFile={(file) => console.log(\'onDownloadFile: \', file)}\n' +
              '  onPreviewFile={(file) => console.log(\'onPreviewFile: \', file)}\n' +
              '  onContentClick={(file) => console.log(\'onContentClick: \', file)}\n' +
              '  onPreviousPage={(file) => console.log(\'onPreviousPage: \', file)}\n' +
              '  onNextPage={(file) => console.log(\'onNextPage: \', file)}\n' +
              '  scale={2}' +
              '/>', { buttonsPosition: buttonsPosition, buttonsVisibility: buttonsVisibility, viewOnePage: viewOnePage })}
            </SyntaxHighlighter>
          </div>
        </div>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
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
              <td>animate</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Animate the file rendering</td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td>buttonsPosition</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>When to place context buttons. It can be one of values <code>inside</code> (over the file div) or
                <code>header</code> above the file div
              </td>
              <td><code>inside</code></td>
            </tr>
            <tr>
              <td>buttonsVisibility</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>When to show context buttons. It can be one of values <code>always</code> (always
                visible), <code>hover</code> (visible only when hovering file), or <code>none</code>
              </td>
              <td><code>hover</code></td>
            </tr>
            <tr>
              <td>className</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Additional classnames</td>
              <td>-</td>
            </tr>
            <tr>
              <td>file</td>
              <td><code>object</code></td>
              <td>true</td>
              <td>File object. See above for a sample on how the object should be</td>
              <td>-</td>
            </tr>
            <tr>
              <td>height</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>File height, in pixels</td>
              <td>140</td>
            </tr>
            <tr>
              <td>initialPage</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Set the intial page for PDF rendering</td>
              <td>-</td>
            </tr>
            <tr>
              <td>labels</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>Optional label object to override the default labels</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onAddFile</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the Add button is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onContentClick</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the file content is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onDeleteFile</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the Delete button is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onLoadSuccess</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the file content is loaded (PDF file only)</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onPreviewFile</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the Preview button is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onPreviousPage</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the Previous page button is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onNextPage</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the Next page button is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>scale</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>Scale of the file</td>
              <td>1.0</td>
            </tr>
            <tr>
              <td>showAddButton</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Display toggle for the Add button</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showDeleteButton</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Display toggle for the Delete button</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showDownloadButton</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Display toggle for the Download button</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showPreviewButton</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Display toggle for the Preview button</td>
              <td>false</td>
            </tr>
            <tr>
              <td>viewOnePage</td>
              <td><code>boolean</code></td>
              <td>true</td>
              <td>For PDFs, toggle between view one page at a time, or render all pages at once</td>
              <td>true</td>
            </tr>
            <tr>
              <td>width</td>
              <td><code>number</code></td>
              <td>false</td>
              <td>File width, in pixels</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default FilePage
