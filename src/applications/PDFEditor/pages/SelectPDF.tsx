import FileUpload from 'filopplasting'
import { Step } from 'declarations/PDFEditor.d'
import { Files } from 'forhandsvisningsfil/lib/index.d'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import { Hovedknapp, Undertittel } from 'Nav'
import PT from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as pdfActions from '../actions/pdf'
import { State } from '../reducer'

export interface SelectPDFProps {
  labels: Labels;
  setStep: (s: Step) => void;
}

const SelectPDF: React.FC<SelectPDFProps> = ({
  labels, setStep
}: SelectPDFProps): JSX.Element => {
  const files = useSelector<State, Files>(state => state.files)
  const loadingPDF = useSelector<State, boolean>(state => state.loadingPDF)
  const dispatch = useDispatch()

  const onForwardButtonClick = () => {
    setStep('edit')
  }

  const handleFileChange = (files: Files) => {
    dispatch(pdfActions.selectPDF(files))
  }

  const handleBeforeDrop = () => {
    dispatch(pdfActions.loadingFilesStart())
  }

  const handleAfterDrop = () => {
    dispatch(pdfActions.loadingFilesEnd())
  }

  return (
    <>
      <div className='fieldset mt-4 mb-4'>
        <Undertittel className='mb-3'>{labels.title_fileUpload}</Undertittel>
        <FileUpload
          acceptedMimetypes={['application/pdf', 'image/jpeg', 'image/png']}
          files={files}
          beforeFileDrop={handleBeforeDrop}
          afterFileDrop={handleAfterDrop}
          onFilesChanged={handleFileChange}
        />
      </div>
      <Hovedknapp
        className='forwardButton'
        spinner={loadingPDF}
        disabled={_.isEmpty(files)}
        onClick={onForwardButtonClick}
      >
        {loadingPDF ? labels.loading_loadingPDF : labels.button_forward}
      </Hovedknapp>
    </>
  )
}

SelectPDF.propTypes = {
  labels: LabelsPropType.isRequired,
  setStep: PT.func.isRequired
}

export default SelectPDF
