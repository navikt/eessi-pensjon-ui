import AlertStripe, { AlertStripeAdvarsel, AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { BekreftCheckboksPanel, Checkbox, CheckboksPanel, CheckboksPanelGruppe, Input, Radio, RadioPanel, RadioPanelGruppe, Select, SkjemaGruppe, Textarea, TextareaControlled } from 'nav-frontend-skjema'
import Chevron from 'nav-frontend-chevron'
import Ekspanderbartpanel, { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel'
import EtikettBase, { EtikettAdvarsel, EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter'
import { Container, Row, Column } from 'nav-frontend-grid'
import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Hamburgerknapp, Menyknapp, Nesteknapp, Systemerknapp, Søkeknapp, Tilbakeknapp, Xknapp } from 'nav-frontend-ikonknapper'
import Ikon from 'nav-frontend-ikoner-assets'
import KnappBase, { Knapp, Hovedknapp, Flatknapp, Fareknapp } from 'nav-frontend-knapper'
import Lenke from 'nav-frontend-lenker'
import Lenkepanel, { LenkepanelBase } from 'nav-frontend-lenkepanel'
import Lesmerpanel from 'nav-frontend-lesmerpanel'
import Lukknapp from 'nav-frontend-lukknapp'
import Modal from 'nav-frontend-modal'
import Panel from 'nav-frontend-paneler'
import Popover from 'nav-frontend-popover'
import Snakkeboble from 'nav-frontend-snakkeboble'
import Spinner from 'nav-frontend-spinner'
import Stegindikator from 'nav-frontend-stegindikator'
import Tabs from 'nav-frontend-tabs'
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-toggle'
import { Sidetittel, Innholdstittel, Systemtittel, Undertittel, Element, Feilmelding, Normaltekst, Undertekst, UndertekstBold, Ingress } from 'nav-frontend-typografi'
import Veileder from 'nav-frontend-veileder'
import Veilederpanel from 'nav-frontend-veilederpanel'

(AlertStripe as unknown as React.FunctionComponent).displayName = 'AlertStripe';
(AlertStripeAdvarsel as unknown as React.FunctionComponent).displayName = 'AlertStripeAdvarsel';
(AlertStripeFeil as unknown as React.FunctionComponent).displayName = 'AlertStripeFeil';
(AlertStripeInfo as unknown as React.FunctionComponent).displayName = 'AlertStripeInfo';
(AlertStripeSuksess as unknown as React.FunctionComponent).displayName = 'AlertStripeSuksess';
(BekreftCheckboksPanel as unknown as React.FunctionComponent).displayName = 'BekreftCheckboksPanel';
(Checkbox as unknown as React.FunctionComponent).displayName = 'Checkbox';
(CheckboksPanel as unknown as React.FunctionComponent).displayName = 'CheckboksPanel';
(CheckboksPanelGruppe as unknown as React.FunctionComponent).displayName = 'CheckboksPanelGruppe';
(Chevron as unknown as React.FunctionComponent).displayName = 'Chevron';
(Container as unknown as React.FunctionComponent).displayName = 'Container';
(Column as unknown as React.FunctionComponent).displayName = 'Column';
(Ekspanderbartpanel as unknown as React.FunctionComponent).displayName = 'Ekspanderbartpanel';
(EkspanderbartpanelBase as unknown as React.FunctionComponent).displayName = 'EkspanderbartpanelBase';
(Element as unknown as React.FunctionComponent).displayName = 'Element';
(EtikettBase as unknown as React.FunctionComponent).displayName = 'EtikettBase';
(EtikettAdvarsel as unknown as React.FunctionComponent).displayName = 'EtikettAdvarsel';
(EtikettFokus as unknown as React.FunctionComponent).displayName = 'EtikettFokus';
(EtikettInfo as unknown as React.FunctionComponent).displayName = 'EtikettInfo';
(EtikettSuksess as unknown as React.FunctionComponent).displayName = 'EtikettSuksess';
(Fareknapp as unknown as React.FunctionComponent).displayName = 'Fareknapp';
(Feilmelding as unknown as React.FunctionComponent).displayName = 'Feilmelding';
(Flatknapp as unknown as React.FunctionComponent).displayName = 'Flatknapp';
(Hamburgerknapp as unknown as React.FunctionComponent).displayName = 'Hamburgerknapp';
(Hjelpetekst as unknown as React.FunctionComponent).displayName = 'Hjelpetekst';
(Hovedknapp as unknown as React.FunctionComponent).displayName = 'Hovedknapp';
(Ikon as unknown as React.FunctionComponent).displayName = 'Ikon';
(Ingress as unknown as React.FunctionComponent).displayName = 'Ingress';
(Innholdstittel as unknown as React.FunctionComponent).displayName = 'Innholdstittel';
(Input as unknown as React.FunctionComponent).displayName = 'Input';
(Knapp as unknown as React.FunctionComponent).displayName = 'Knapp';
(KnappBase as unknown as React.FunctionComponent).displayName = 'KnappBase';
(Lenke as unknown as React.FunctionComponent).displayName = 'Lenke';
(Lenkepanel as unknown as React.FunctionComponent).displayName = 'Lenkepanel';
(LenkepanelBase as unknown as React.FunctionComponent).displayName = 'LenkepanelBase';
(Lesmerpanel as unknown as React.FunctionComponent).displayName = 'Lesmerpanel';
(Lukknapp as unknown as React.FunctionComponent).displayName = 'Lukknapp';
(Modal as unknown as React.FunctionComponent).displayName = 'Modal';
(Menyknapp as unknown as React.FunctionComponent).displayName = 'Menyknapp';
(Nesteknapp as unknown as React.FunctionComponent).displayName = 'Nesteknapp';
(Normaltekst as unknown as React.FunctionComponent).displayName = 'Normaltekst';
(Panel as unknown as React.FunctionComponent).displayName = 'Panel';
(Popover as unknown as React.FunctionComponent).displayName = 'Popover';
(Radio as unknown as React.FunctionComponent).displayName = 'Radio';
(RadioPanel as unknown as React.FunctionComponent).displayName = 'RadioPanel';
(RadioPanelGruppe as unknown as React.FunctionComponent).displayName = 'RadioPanelGruppe';
(Row as unknown as React.FunctionComponent).displayName = 'Row';
(Select as unknown as React.FunctionComponent).displayName = 'Select';
(SkjemaGruppe as unknown as React.FunctionComponent).displayName = 'SkjemaGruppe';
(Snakkeboble as unknown as React.FunctionComponent).displayName = 'Snakkeboble';
(Spinner as unknown as React.FunctionComponent).displayName = 'Spinner';
(Stegindikator as unknown as React.FunctionComponent).displayName = 'Stegindikator';
(Systemtittel as unknown as React.FunctionComponent).displayName = 'Systemtittel';
(Systemerknapp as unknown as React.FunctionComponent).displayName = 'Systemerknapp';
(Søkeknapp as unknown as React.FunctionComponent).displayName = 'Søkeknapp';
(Tabs as unknown as React.FunctionComponent).displayName = 'Tabs';
(Textarea as unknown as React.FunctionComponent).displayName = 'Textarea';
(TextareaControlled as unknown as React.FunctionComponent).displayName = 'TextareaControlled';
(Tilbakeknapp as unknown as React.FunctionComponent).displayName = 'Tilbakeknapp';
(ToggleGruppe as unknown as React.FunctionComponent).displayName = 'ToggleGruppe';
(ToggleKnapp as unknown as React.FunctionComponent).displayName = 'ToggleKnapp';
(Undertittel as unknown as React.FunctionComponent).displayName = 'Undertittel';
(Undertekst as unknown as React.FunctionComponent).displayName = 'Undertekst';
(UndertekstBold as unknown as React.FunctionComponent).displayName = 'UndertekstBold';
(Veileder as unknown as React.FunctionComponent).displayName = 'Veileder';
(Veilederpanel as unknown as React.FunctionComponent).displayName = 'Veilederpanel';
(Xknapp as unknown as React.FunctionComponent).displayName = 'XKnapp'

export {
  AlertStripe, AlertStripeAdvarsel, AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess,
  BekreftCheckboksPanel,
  Checkbox, CheckboksPanel, CheckboksPanelGruppe, Chevron, Container, Column,
  Ekspanderbartpanel, EkspanderbartpanelBase, Element, EtikettBase, EtikettAdvarsel, EtikettFokus, EtikettInfo, EtikettSuksess,
  Fareknapp, Feilmelding, Flatknapp,
  Hamburgerknapp, Hjelpetekst, Hovedknapp,
  Ikon, Ingress, Innholdstittel, Input,
  Knapp, KnappBase,
  Lenke, Lenkepanel, LenkepanelBase, Lesmerpanel, Lukknapp,
  Modal, Menyknapp,
  Nesteknapp, Normaltekst,
  Panel, Popover,
  Radio, RadioPanel, RadioPanelGruppe, Row,
  Select, Sidetittel, SkjemaGruppe, Snakkeboble, Spinner, Stegindikator, Systemtittel, Systemerknapp, Søkeknapp,
  Tabs, Textarea, TextareaControlled, Tilbakeknapp, ToggleGruppe, ToggleKnapp,
  Undertittel, Undertekst, UndertekstBold,
  Veileder, Veilederpanel,
  Xknapp
}
