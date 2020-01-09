import React from 'react'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import Container from './Container'

const IndexPage: React.FC = (): JSX.Element => (
  <Container>
    <Panel className='p-4'>
      <Systemtittel className='pt-4 pb-4'>EESSI Pensjon React Components</Systemtittel>
      <Normaltekst>This is a showcase page for all React applications / components used in EESSI Pensjon UI web projects.</Normaltekst>
      <Normaltekst>Use the left menu to browse all components and learn how to configure them.</Normaltekst>

      <Undertittel className='pt-4 pb-4'>How to add a EESSI Pensjon component to your web project</Undertittel>
      <Normaltekst>In order to use any of these components, you have to:</Normaltekst>
      <ol className='pt-4'>
        <li>
          <Normaltekst className='pb-4'>Add into <code>package.json</code>:</Normaltekst>
          <pre>"eessi-pensjon-ui": "https://github.com/navikt/eessi-pensjon-ui#{'{'}tag{'}'}]",</pre>
          <Normaltekst className='pb-4'>Where <code>{'{'}tag{'}'}</code> is an optional Git tag or branch (defaults to master)</Normaltekst>
        </li>
        <li>
          <Normaltekst className='pb-4'>Import the React component as follows:</Normaltekst>
          <pre>import {'{'} Component {'}'} from 'eessi-pensjon-ui'</pre>
        </li>
      </ol>

      <Undertittel className='pt-4 pb-4'>How to add a NAV components to your web project</Undertittel>
      <Normaltekst>This package has a separate dist that gathers all <a href='//design.nav.no'>NAV Designsystem</a> components in one import.</Normaltekst>
      <Normaltekst className='pb-4'>To use only that dist, do: </Normaltekst>

      <pre>import * as Nav from 'eessi-pensjon-ui/nav'</pre>
      <hr className='mt-5' style={{ borderColor: 'gray' }} />
      <Normaltekst>Maintainer: <a href='mailto:NunoCardoso@nav.no'>Nuno.Cardoso@nav.no</a></Normaltekst>
      <Normaltekst>Project page: <a href='//github.com/navikt/eessi-pensjon-ui/'>Github</a></Normaltekst>
    </Panel>
  </Container>
)

export default IndexPage
