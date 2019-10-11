import React, { useState, useEffect, useRef } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import File from '../../../components/File/File'
import * as Nav from '../../../Nav'

const GeneratePDF = (props) => {
  const { actions, fileNames, files, generatingPDF, generatedPDFs, labels, recipes, watermark, setStep } = props
  const [_fileNames, setFileNames] = useState({})
  const [mounted, setMounted] = useState(false)
  const _refs = useRef(_.mapValues(recipes, () => React.createRef()))

  useEffect(() => {
    if (!mounted && files) {
      actions.generatePDF({
        recipes: recipes,
        files: files,
        watermark: watermark
      })
      setMounted(true)
    }
  }, [mounted, actions, files, recipes, watermark])

  const setKeys = (generatedPDFs) => {
    const newfileNames = {}
    Object.keys(generatedPDFs).forEach(key => {
      newfileNames[key] = generatedPDFs[key].name
    })
    return newfileNames
  }

  useEffect(() => {
    if (mounted && !_.isEmpty(generatedPDFs) && _.isEmpty(fileNames)) {
      setFileNames(setKeys(generatedPDFs))
    }
  }, [generatedPDFs, fileNames])

  const onBackButtonClick = () => {
    setStep('edit')
  }

  const onForwardButtonClick = () => {
    actions.clearPDF()
  }

  const setFileName = (key, value) => {
    const newFileNames = _.clone(_fileNames)
    newFileNames[key] = value
    setFileNames(newFileNames)
  }

  const downloadAll = () => {
    Object.keys(generatedPDFs).forEach(key => {
      _refs[key].current.click()
    })
  }

  const buttonText = generatingPDF ? labels.loading_generatingPDF : labels.label_startAgain

  return (
    <div>
      {generatingPDF ? (
        <div className='w-100 text-center'>
          <Nav.Spinner />
          <p className='typo-normal'>{labels.loading_generatingPDF}</p>
        </div>
      ) : (generatedPDFs ? (
        <div>
          {Object.keys(generatedPDFs).map(key => {
            const pdf = generatedPDFs[key]
            return (
              <div key={key} className='fieldset animate'>
                <div className='pdfrow'>
                  <File file={pdf} />
                  <div className='ml-4'>
                    <Nav.Input
                      label={labels.filename} value={_fileNames[key]}
                      onChange={(e) => setFileName(key, e.target.value)}
                    />
                    <a
                      className='hiddenLink' ref={_refs[key]}
                      onClick={(e) => e.stopPropagation()} title={labels.label_download}
                      href={'data:application/octet-stream;base64,' + encodeURIComponent(pdf.content.base64)}
                      download={_fileNames[key]}
                    >{labels.label_download}
                    </a>
                    <Nav.Knapp
                      className='downloadButton'
                      onClick={() => _refs[key].current.click()}
                    >
                      {labels.label_download}
                    </Nav.Knapp>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null)}
      <Nav.Row className='mt-4'>
        <Nav.Column>
          <Nav.Hovedknapp className='downloadAllButton' onClick={downloadAll}>{labels.button_downloadAll}</Nav.Hovedknapp>
          <Nav.Knapp disabled={generatingPDF} className='ml-3 forwardButton' onClick={onForwardButtonClick}>{buttonText}</Nav.Knapp>
          <Nav.Flatknapp className='backButton ml-3' onClick={onBackButtonClick}>{labels.label_back}</Nav.Flatknapp>
        </Nav.Column>
      </Nav.Row>
    </div>
  )
}

GeneratePDF.propTypes = {
  generatingPDF: PT.bool,
  actions: PT.object,
  files: PT.array.isRequired,
  labels: PT.object,
  recipes: PT.object.isRequired,
  generatedPDFs: PT.object,
  watermark: PT.object
}

export default GeneratePDF
