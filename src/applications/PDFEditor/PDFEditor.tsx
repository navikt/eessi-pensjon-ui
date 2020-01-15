import { Recipes, RecipeType, Separator, Step, Watermark } from 'declarations/PDFEditor.d'
import { Modal, ModalContent } from 'components/Modal/Modal'
import React, { useState } from 'react'
import { ActionCreators, Dispatch, Files, Labels, State } from 'declarations/types.d'
import * as pdfActions from './actions/pdf'
import StepIndicator from './components/StepIndicator'
import EditPDF from './pages/EditPDF'
import GeneratePDF, { GeneratedPDFs } from './pages/GeneratePDF'
import SelectPDF from './pages/SelectPDF'
import defaultLabels from 'applications/PDFEditor/PDFEditor.labels'
import { bindActionCreators, connect } from 'store'

const mapStateToProps = (state: State) => (state)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(pdfActions, dispatch)
})

export interface PDFEditorProps {
  actions: ActionCreators;
  dndTarget: RecipeType;
  files: Files;
  generatingPDF: boolean;
  generatedPDFs: GeneratedPDFs;
  labels: Labels;
  loadingPDF: boolean;
  modal: ModalContent;
  pageScale: number;
  recipes: Recipes;
  separator: Separator;
  watermark: Watermark;
}

export const PDFEditor: React.FC<PDFEditorProps> = ({
  actions, dndTarget, files, generatingPDF, generatedPDFs, labels, loadingPDF, modal, pageScale, recipes, separator, watermark
}: PDFEditorProps): JSX.Element => {
  const _labels = { ...defaultLabels, ...labels }
  const [step, setStep] = useState<Step>('select')
  return (
    <div className='a-pdf'>
      <Modal modal={modal} onModalClose={() => actions.setModal(undefined)} />
      <StepIndicator step={step} files={files} setStep={setStep} labels={_labels} recipes={recipes} />
      {step === 'select' ? (
        <SelectPDF
          actions={actions}
          loadingPDF={loadingPDF}
          files={files}
          labels={_labels}
          setStep={setStep}
        />
      ) : null}
      {step === 'edit' ? (
        <EditPDF
          actions={actions}
          dndTarget={dndTarget}
          files={files}
          recipes={recipes}
          labels={_labels}
          pageScale={pageScale}
          separator={separator}
          setStep={setStep}
          watermark={watermark}
        />
      ) : null}
      {step === 'generate' ? (
        <GeneratePDF
          actions={actions}
          files={files}
          generatingPDF={generatingPDF}
          generatedPDFs={generatedPDFs}
          labels={_labels}
          recipes={recipes}
          setStep={setStep}
          watermark={watermark}
        />
      ) : null}
    </div>
  )
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PDFEditor)
