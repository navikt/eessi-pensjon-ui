import { ModalContent } from 'declarations/components'
import { Recipes, Step } from 'declarations/PDFEditor.d'
import { Modal } from 'components/Modal/Modal'
import { LabelsPropType } from 'declarations/types.pt'
import React, { useState } from 'react'
import { Files } from 'forhandsvisningsfil/lib/index.d'
import { Labels } from 'declarations/types.d'
import { useDispatch, useSelector } from 'react-redux'
import { State } from './reducer'
import * as pdfActions from './actions/pdf'
import StepIndicator from './components/StepIndicator'
import EditPDF from './pages/EditPDF'
import GeneratePDF from './pages/GeneratePDF'
import SelectPDF from './pages/SelectPDF'
import defaultLabels from 'applications/PDFEditor/PDFEditor.labels'

export interface PDFEditorProps {
  labels?: Labels;
}

export const PDFEditor: React.FC<PDFEditorProps> = ({
  labels = {}
}: PDFEditorProps): JSX.Element => {
  const _labels = { ...defaultLabels, ...labels }
  const [step, setStep] = useState<Step>('select')
  const modal = useSelector<State, ModalContent | undefined>(state => state.modal)
  const recipes = useSelector<State, Recipes>(state => state.recipes as Recipes)
  const files = useSelector<State, Files>(state => state.files)
  const dispatch = useDispatch()

  return (
    <div className='a-pdf'>
      <Modal modal={modal} onModalClose={() => dispatch(pdfActions.setModal(undefined))} />
      <StepIndicator step={step} files={files} setStep={setStep} labels={_labels} recipes={recipes} />
      {step === 'select' ? (
        <SelectPDF
          labels={_labels}
          setStep={setStep}
        />
      ) : null}
      {step === 'edit' ? (
        <EditPDF
          labels={_labels}
          setStep={setStep}
        />
      ) : null}
      {step === 'generate' ? (
        <GeneratePDF
          labels={_labels}
          setStep={setStep}
        />
      ) : null}
    </div>
  )
}

PDFEditor.propTypes = {
  labels: LabelsPropType
}

export default PDFEditor
