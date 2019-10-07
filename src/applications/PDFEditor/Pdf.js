import React, { useState } from 'react'
import * as pdfActions from './actions/pdf'
import * as uiActions from './actions/ui'
import StepIndicator from './components/StepIndicator'
import { connect, bindActionCreators } from './store'
import SelectPDF from './pages/SelectPDF'
import EditPDF from './pages/EditPDF'
import GeneratePDF from './pages/GeneratePDF'
import { Modal } from '../../Nav'

const mapStateToProps = (state) => {
  return {
    dndTarget: state.pdf.dndTarget,
    files: state.pdf.files,
    generatingPDF: state.pdf.generatingPDF,
    generatedPDFs: state.pdf.generatedPDFs,
    loadingPDF: state.pdf.loadingPDF,
    pageScale: state.pdf.pageScale,
    recipe: state.pdf.recipe,
    watermark: state.pdf.watermark,
    modal: state.ui.modal,
    modalOpen: state.ui.modalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...pdfActions, ...uiActions }, dispatch)
  }
}

const defaultLabels = {
  addAll: 'Legg til alle',

  'app-pdfTitle': 'PDF',
  'app-createPdf': 'Opprett ny PDF',
  'app-selectPdfTitle': 'Velg til ny PDF',
  'app-selectPdfDescription': 'Velg fra eksisterende PDF-filer for å opprette ny dokumentpakke',
  'app-editPdfTitle': 'Redigere ny PDFs',
  'app-editPdfDescription': 'Rediger og opprett ny PDF dokumentpakke sammensatt av dokumenter fra valgte PDF eller bild filer',
  'app-generatePdfTitle': 'Generer ny PDFs',

  'alert-invalidStep1': 'Last opp noe filer før du fortsette',
  'alert-invalidStep2': 'Velg noe sider/bilder før du fortsette',
  'alert-PDFGenerationFail': 'Feil å generere PDF',
  'alert-PDFGenerationSuccess': 'Generert PDF',

  'loading-loadingPDF': 'Laster ny PDF...',
  'loading-loadingFileList': 'Laster fil list...',
  'loading-generatingPDF': 'Genererer ny PDF...',

  'help-select-pdf': 'Her kan du skreddersy ny dokumentpakke av eksisterende PDF filer eller bilder. Du kan også opprette nytt PDF-dokument.',
  'help-edit-pdf': 'Dra sider inn i boksen.  Husk å velge riktig kategori Arbeid, Botid, Sykdom eller Annet. Sider i boksen vil inngå i nyopprettet PDF dokumentpakke.',
  'help-generate-pdf': 'Du kan laste ned PDF filer du har generert',
  'help-sizeSliderTooltip': 'Skyv frem/tilbake for å øke/redusere PDFs størrelse',
  'help-specials-pdf': 'Skriv inn fritekst til en ny side, max antall tegn er 100 bokstaver, og dra siden til dokumentboks. Du kan opprette flere sider med fritekst.',

  'recipe-empty-title': 'Tøm PDF',
  'recipe-empty-text': 'Du har ikke valgt dokumenter og sider for generering av ny PDF',
  'recipe-valid-title': 'Generer ny PDF',
  'recipe-valid-text': 'Er du sikker på du vil generere ny PDF nå?',

  'specials-title': 'Lage nytt brev',
  'specials-textPlaceholder': 'Skriv tekst her, deretter dra siden til dokumentboks',
  'specials-watermarkPlaceholder': 'Vannmerke',

  'form-step0': 'Velg filer',
  'form-step1': 'Rediger PDFs',
  'form-step2': 'Genererer PDFs',

  home: 'Botid',
  work: 'Arbeid',
  sick: 'Sykdom',
  other: 'Annet',
  content: 'Innhold',
  cancel: 'Avbryt',
  generate: 'Generere',
  documentBox: 'Dokumentboks',
  images: 'Bilder',
  yes: 'Ja',
  'ok-got-it': 'Ok',
  fileUpload: 'Last opp filer',
  forward: 'Neste',
  back: 'Tilbake',
  startAgain: 'Start på nytt',
  downloadAll: 'Last ned alle',
  watermark: 'Vannmerke'

}

export const Pdf = (props) => {
  const { actions, files, recipe, labels, modal, modalOpen } = props
  const _labels = { ...defaultLabels, ...labels }
  const [step, setStep] = useState('select')
  return (
    <div className='a-pdf'>
      <Modal
        modalOpen={modalOpen}
        modal={modal}
        onModalClose={actions.closeModal}
      />
      <StepIndicator step={step} setStep={setStep} recipe={recipe} files={files} />
      {step === 'select' ? <SelectPDF {...props} labels={_labels} setStep={setStep} /> : null}
      {step === 'edit' ? <EditPDF {...props} labels={_labels} setStep={setStep} /> : null}
      {step === 'generate' ? <GeneratePDF {...props} labels={_labels} setStep={setStep} /> : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Pdf)
