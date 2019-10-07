import React from 'react'
import Container from './Container'
import { Normaltekst, Panel, Systemtittel } from '../Nav'
const IndexPage = () => (
  <Container>
    <Panel className='p-4'>
      <Systemtittel className='pt-4 pb-4'>Index</Systemtittel>
      <Normaltekst>This is a showcase page for all applications and components used in EESSI Pensjon UI web products.</Normaltekst>
      <Normaltekst>If you want to use any of these components in your web project, you have to:</Normaltekst>
      <ol>
        <li>
          <Normaltekst>Add into <code>package.json</code>:</Normaltekst>
          <pre>"eessi-pensjon-ui": "https://github.com/navikt/eessi-pensjon-ui#{'{'}tag{'}'}]",</pre>
          <Normaltekst>Where <code>{'{'}tag{'}'}</code> can be a git tag or branch (master)</Normaltekst>
        </li>
        <li>
          <Normaltekst>Import the components as follows:</Normaltekst>
          <pre>import {'{'} Component {'}'} from 'eessi-pensjon-ui</pre>
        </li>
      </ol>
      <Normaltekst>Use the menu to see the component's page and to learn how to configure.</Normaltekst>
    </Panel>
  </Container>
)

export default IndexPage
