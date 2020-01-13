import RefreshButton from 'components/RefreshButton/RefreshButton'
import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { State } from 'declarations/types'
import { Checkbox, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import { connect } from '../store'
import Container from './Container'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state: State) => ({ highContrast: state.highContrast })

const RefreshButtonPage: React.FC<PageProps> = ({ highContrast }: PageProps): JSX.Element => {
  const [rotating, setRotating] = useState<boolean>(false)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Refresh button</Systemtittel>
        <Normaltekst className='pb-4'>Spinning refresh button. Click on the checkbox to toggle <code>rotating</code> boolean prop.</Normaltekst>

        <Checkbox label='Toggle rotating' checked={rotating} onChange={() => setRotating(!rotating)} />

        <RefreshButton
          rotating={rotating}
          onRefreshClicked={() => window.alert('Refreshing')}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<RefreshButton \n' +
          '  rotating={rotating} \n' +
          '  onRefreshClicked={() => window.alert(\'Refreshing\')} />'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { RefreshButton } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-refreshbutton</code></Normaltekst>
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
              <td>labelRefresh</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Label to show when mouse point hovers the button</td>
              <td>'Forfriske'</td>
            </tr>
            <tr>
              <td>onRefreshClicked</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function triggered when the button is clicked</td>
              <td>-</td>
            </tr>
            <tr>
              <td>rotating</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Toggle icon rotation</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(RefreshButtonPage)
