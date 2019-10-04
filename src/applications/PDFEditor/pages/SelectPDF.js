import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { Hovedknapp } from '../../../Nav'
import FileUpload from '../../../components/FileUpload/FileUpload'

const SelectPDF = ({ actions, labels, loadingPDF, files, setStep }) => {
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

  const buttonText = loadingPDF ? labels['loading-loadingPDF'] : labels.forward
  return (
    <>
      <div style={{ animation: 'none', opacity: 1 }} className='fieldset mt-4 mb-4'>
        <h2 className='mb-3'>{labels.fileUpload}</h2>
        <FileUpload
          className={classNames('fileUpload', 'mb-3')}
          accept={['application/pdf', 'image/jpeg', 'image/png']}
          files={files || []}
          beforeDrop={handleBeforeDrop}
          afterDrop={handleAfterDrop}
          onFileChange={handleFileChange}
          openModal={actions.openModal}
          closeModal={actions.closeModal}
        />
      </div>
      <Hovedknapp
        className='forwardButton'
        spinner={loadingPDF}
        disabled={_.isEmpty(files)}
        onClick={onForwardButtonClick}
      >{buttonText}
      </Hovedknapp>
    </>
  )
}

SelectPDF.propTypes = {
  loadingPDF: PT.bool,
  actions: PT.object,
  labels: PT.object,
  files: PT.array.isRequired
}

export default SelectPDF
