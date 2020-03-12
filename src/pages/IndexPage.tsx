import React from 'react'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import Container from './Container'

const IndexPage: React.FC = (): JSX.Element => (
  <Container>
    <Panel className='p-4'>
      <Systemtittel className='pb-4'>EESSI Pensjon React Components</Systemtittel>
      <Normaltekst className='pb-4'>This page showcases all React applications / components used in EESSI Pensjon web projects.</Normaltekst>
      <Normaltekst className='pb-4'>Use the left menu to browse applications / components and learn how to configure them.</Normaltekst>

      <Undertittel className='pt-4 pb-4'>How to add a EESSI Pensjon component to your web project</Undertittel>
      <Normaltekst>In order to use any of these components, you have to:</Normaltekst>
      <ol>
        <li className='pt-4'>
          <Normaltekst>Add this repo as a dependency in your project's <code>package.json</code> with this line:</Normaltekst>
          <code>"eessi-pensjon-ui": "https://github.com/navikt/eessi-pensjon-ui#{'{'}tag{'}'}]",</code>
          <Normaltekst>Where <code>{'{'}tag{'}'}</code> is an optional Git tag or branch (defaults to master)</Normaltekst>
        </li>
        <li className='pt-4'>
          <Normaltekst>Import the React component as follows:</Normaltekst>
          <code>import Ui from 'eessi-pensjon-ui'</code>
        </li>
        <li className='pt-4'>
          <Normaltekst>Use the component as follows:</Normaltekst>
          <code>{'<Ui.Icon kind=\'calendar\'/>'}</code>
        </li>
      </ol>

      <Undertittel className='pt-4 pb-4'>How to add a NAV components to your web project</Undertittel>
      <Normaltekst>We bundle a separate dist file that gathers all <a href='//design.nav.no'>NAV Designsystem</a> components in one import.</Normaltekst>
      <Normaltekst className='pt-4'>To use only that dist file, do: </Normaltekst>

      <ol>
        <li className='pt-4'>
          <Normaltekst>To use only that dist file, do: </Normaltekst>
          <code>import * as Nav from 'eessi-pensjon-ui/dist/nav'</code>
        </li>
        <li className='pt-4'>
          <Normaltekst>Use the component as follows:</Normaltekst>
          <code>{'<Nav.Normaltekst/>text</Nav.Normaltekst>'}</code>
        </li>
        <li className='pt-4'>
          <Normaltekst>You should also import the CSS as in </Normaltekst>
          <code>import 'eessi-pensjon-ui/dist/nav.css'</code>
        </li>
      </ol>

      <Undertittel className='pt-4'>Other useful imports</Undertittel>
      <ol>
        <li className='pt-4'>
          <Normaltekst>A minimal Bootstrap CSS file is available in: </Normaltekst>
          <code>import 'eessi-pensjon-ui/dist/minibootstrap.css'</code>
        </li>
        <li className='pt-4'>
          <Normaltekst>API call action based on window.fetch </Normaltekst>
          <code className='block'>{'import { call } from \'eessi-pensjon-ui/dist/api\''}</code>
          <code className='block'>{'return call({\n\
  url: url,\n\
  type: {\n\
    request: types.REQUEST,\n\
    success: types.SUCCESS,\n\
    failure: types.FAILURE\n\
  )}\n\
}'}
          </code>
        </li>
        <li className='pt-4'>
          <Normaltekst>Typescript declaration files: </Normaltekst>
          <div><code>eessi-pensjon-ui/dist/declarations/components.d'</code> - Typescript types/interfaces from component elements</div>
          <div><code>eessi-pensjon-ui/dist/declarations/components.pt'</code> - Prop-types from component elements</div>
          <div><code>eessi-pensjon-ui/dist/declarations/Dashboard.d'</code> - Typescript types/interfaces from Dashboard application</div>
          <div><code>eessi-pensjon-ui/dist/declarations/Dashboard.pt'</code> - Prop-types from Dashboard application</div>
          <div><code>eessi-pensjon-ui/dist/declarations/PDFEditor.d'</code> - Typescript types/interfaces from PDFEditor application</div>
          <div><code>eessi-pensjon-ui/dist/declarations/PDFEditor.pt'</code> - Prop-types from PDFEditor application</div>
          <div><code>eessi-pensjon-ui/dist/declarations/types.d'</code> - Global typescript types/interfaces</div>
          <div> <code>eessi-pensjon-ui/dist/declarations/types.pt'</code> - Global prop-types</div>
        </li>
      </ol>
      <hr className='mt-5' style={{ borderColor: 'gray' }} />
      <Normaltekst>Maintainer: <a href='mailto:NunoCardoso@nav.no'>Nuno.Cardoso@nav.no</a></Normaltekst>
      <Normaltekst>Project page: <a href='//github.com/navikt/eessi-pensjon-ui/'>Github</a></Normaltekst>
    </Panel>
  </Container>
)

export default IndexPage
