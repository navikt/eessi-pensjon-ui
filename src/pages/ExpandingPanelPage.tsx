import ExpandingPanel from 'components/ExpandingPanel/ExpandingPanel'
import File from 'components/File/File'
import { Undertittel } from 'nav-frontend-typografi'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { State } from 'types'
import { Hovedknapp, Normaltekst, Panel, Systemtittel } from '../Nav'
import sampleJPG from '../resources/tests/sampleJPG'
import { connect } from '../store'
import Container from './Container'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state: State) => ({ highContrast: state.highContrast })

const ExpandingPanelPage: React.FC<PageProps> = ({ highContrast }: PageProps): JSX.Element => {
  const [panelNumClicks, setPanelNumClicks] = useState<number>(0)
  const [buttonNumClicks, setButtonNumClicks] = useState<number>(0)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>Expanding panel </Systemtittel>
        <Normaltekst className='mt-4 mb-4'>Same as Ekspandertbartbase, but it doesn't use a button, therefore in Internet Explorer it allows clickable elements in the heading </Normaltekst>
        <Normaltekst className='mt-4 mb-4'>Unless you want clickable elements, you should use NAV's EkspanderbartPanel instead </Normaltekst>
        <ExpandingPanel
          border
          className='w-100'
          heading={(
            <div className='d-flex flex-column'>
              <Normaltekst className='mb-4'>Expanding panel title clicked {panelNumClicks} times</Normaltekst>
              <Hovedknapp onClick={(e) => {
                e.stopPropagation()
                setButtonNumClicks((buttonNumClicks + 1))
              }}
              >Button clicked {buttonNumClicks} times
              </Hovedknapp>
            </div>
          )}
          onClick={() => setPanelNumClicks(panelNumClicks + 1)}
        >
          <File animate={false} file={sampleJPG} scale={3} />
        </ExpandingPanel>

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<ExpandingPanel\n' +
          '   border\n' +
          '   heading={(\n' +
          '     <div className=\'d-flex flex-column\'>\n' +
          '        <Normaltekst className=\'mb-4\'>Expanding panel title clicked {panelNumClicks} times</Normaltekst>\n' +
          '        <Hovedknapp onClick={(e) => {\n' +
          '             e.stopPropagation()\n' +
          '             setButtonNumClicks((buttonNumClicks + 1))\n' +
          '          }}\n' +
          '        >Button clicked {buttonNumClicks} times\n' +
          '        </Hovedknapp>\n' +
          '     </div>\n' +
          '  )}\n' +
          '  onClick={(e) => setPanelNumClicks(panelNumClicks + 1)}\n' +
          '  >\n' +
          '    <File animate={false} file={sampleJPG} scale={3} />\n' +
          '  </ExpandingPanel>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { ExpandingPanel } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-expandingpanel</code>, <code>ekspanderbartPanel</code></Normaltekst>

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
              <td>ariaTittel</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>ARIA title</td>
              <td>-</td>
            </tr>
            <tr>
              <td>border</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Panel border</td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td>className</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Additional classnames</td>
              <td>-</td>
            </tr>
            <tr>
              <td>heading</td>
              <td><code>string</code>, <code>component</code></td>
              <td>true</td>
              <td>Heading string or component</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function when panel is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>open</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Initial open stance</td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td>renderContentWhenClosed</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Render contant when is closed</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(ExpandingPanelPage)
