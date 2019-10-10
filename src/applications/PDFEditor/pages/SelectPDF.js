import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import { Hovedknapp, Undertittel } from '../../../Nav'
import FileUpload from '../../../components/FileUpload/FileUpload'

const SelectPDF = ({ actions, labels, loadingPDF, files = [], setStep }) => {
  const onForwardButtonClick = () => {
    setStep('edit')
  }

  const handleFileChange = (files) => {
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
          beforeDrop={handleBeforeDrop}
          afterDrop={handleAfterDrop}
          onFileChange={handleFileChange}
        />
      </div>
      <Hovedknapp
        className='forwardButton'
        spinner={loadingPDF}
        disabled={_.isEmpty(files)}
        onClick={onForwardButtonClick}>
        {loadingPDF ? labels.loading_loadingPDF : labels.button_forward}
      </Hovedknapp>
    </>
  )
}

SelectPDF.propTypes = {
  actions: PT.object,
  labels: PT.object,
  loadingPDF: PT.bool,
  files: PT.array.isRequired,
  setStep: PT.func.isRequired
}

export default SelectPDF
