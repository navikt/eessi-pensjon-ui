import React from 'react'
import Container from './Container'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const MultipleSelectPage = () => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>NAV components</Systemtittel>
        <Normaltekst>This is an utility import that merges all NAV components from the <a href='//design.nav.no'>NAV Designsystemet</a> into one import object.</Normaltekst>

        <Normaltekst>Nav object includes:</Normaltekst>
        <ul>
          <li><strong>A: </strong>AlertStripe, AlertStripeAdvarsel, AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess</li>
          <li><strong>B: </strong>BekreftCheckboksPanel</li>
          <li><strong>C: </strong>Checkbox, CheckboksPanel, CheckboksPanelGruppe, Chevron, Container, Column</li>
          <li><strong>E: </strong>Ekspanderbartpanel, EkspanderbartpanelBase, Element, EtikettBase, EtikettAdvarsel, EtikettFokus, EtikettInfo, EtikettSuksess, EtikettLiten</li>
          <li><strong>F: </strong>Fareknapp, Fieldset, Flatknapp</li>
          <li><strong>H: </strong>Hamburgerknapp, HjeklpetekstBase, HjelpetekstAuto, HjelpetekstHoyre, HjelpetekstMidt, HjelpetekstOver, HjelpetekstUnder, HjelpetekstUnderHoyre, HjelpetekstUnderVenstre, HjelpetekstVenstre, Hovedknapp</li>
          <li><strong>I: </strong>Ikon, Ingress, Innholdstittel, Input</li>
          <li><strong>K: </strong>Knapp, KnappBase</li>
          <li><strong>L: </strong>Lenke, Lenkepanel, LenkepanelBase, Lesmerpanel, Lukknapp</li>
          <li><strong>M: </strong>Modal, Menyknapp</li>
          <li><strong>N: </strong>Nesteknapp, Normaltekst</li>
          <li><strong>P: </strong>Panel, PanelBase</li>
          <li><strong>R: </strong>Radio, RadioPanel, RadioPanelGruppe, Row</li>
          <li><strong>S: </strong>Select, Sidetittel, SkjemaGruppe, Snakkeboble, Spinner, Stegindikator, Systemtittel, Systemerknapp, Søkeknapp</li>
          <li><strong>T: </strong>Tabs, Tekstomrade, Textarea, TextareaControlled, Tilbakeknapp, ToggleGruppe, ToggleKnapp</li>
          <li><strong>U: </strong>Undertittel, Undertekst, UndertekstBold</li>
          <li><strong>V: </strong>Veileder, Veilederpanel</li>
        </ul>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={prism}>
          {'import { Nav } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>

      </Panel>
    </Container>
  )
}

export default MultipleSelectPage
