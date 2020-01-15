import { Step } from 'declarations/PDFEditor.d'
import FileUpload from 'components/FileUpload/FileUpload'
import _ from 'lodash'
import { Hovedknapp, Undertittel } from 'Nav'
import PT from 'prop-types'
import React from 'react'
import { ActionCreators, Files, Labels } from 'declarations/types.d'
import { ActionCreatorsPropType, FilesPropType, LabelsPropType } from 'declarations/types.pt'

export interface SelectPDFProps {
  actions: ActionCreators;
  labels: Labels;
  loadingPDF: boolean;
  files: Files;
  setStep: (s: Step) => void;
}

const SelectPDF: React.FC<SelectPDFProps> = ({
  actions, labels, loadingPDF, files = [], setStep
}: SelectPDFProps): JSX.Element => {
  const onForwardButtonClick = () => {
    setStep('edit')
  }

  const handleFileChange = (files: Files) => {
    actions.selectPDF(files)
  }

  const handleBeforeDrop = () => {
    actions.loadingFilesStart()
  }

  const handleAfterDrop = () => {
    actions.loadingFilesEnd()
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
  actions: ActionCreatorsPropType.isRequired,
  labels: LabelsPropType.isRequired,
  loadingPDF: PT.bool.isRequired,
  files: FilesPropType.isRequired,
  setStep: PT.func.isRequired
}

export default SelectPDF
