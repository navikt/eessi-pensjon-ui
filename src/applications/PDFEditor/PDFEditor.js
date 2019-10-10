import React, { useState } from 'react'
import * as pdfActions from './actions/pdf'
import StepIndicator from './components/StepIndicator'
import { connect, bindActionCreators } from './store'
import SelectPDF from './pages/SelectPDF'
import EditPDF from './pages/EditPDF'
import GeneratePDF from './pages/GeneratePDF'
import { Modal } from '../../components/Modal/Modal'
import defaultLabels from './PDFEditor.labels'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(pdfActions, dispatch)
  }
}

export const PDFEditor = (props) => {
  const { actions, labels, modal, recipes } = props
  const _labels = { ...defaultLabels, ...labels }
  const [step, setStep] = useState('select')
  return (
    <div className='a-pdf'>
      <Modal modal={modal} onModalClose={() => actions.setModal(undefined)} />
      <StepIndicator step={step} setStep={setStep} labels={_labels} recipes={recipes} />
      {step === 'select' ? <SelectPDF {...props} labels={_labels} setStep={setStep} /> : null}
      {step === 'edit' ? <EditPDF {...props} labels={_labels} setStep={setStep} /> : null}
      {step === 'generate' ? <GeneratePDF {...props} labels={_labels} setStep={setStep} /> : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PDFEditor)
