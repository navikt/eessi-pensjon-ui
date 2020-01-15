import {
  Recipes,
  Step,
  Watermark
} from 'declarations/PDFEditor.d'
import {
  RecipesPropType,
  WatermarkPropType
} from 'declarations/PDFEditor.pt'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import FileFC from 'components/File/File'
import { ActionCreators, File, Files, Labels } from 'declarations/types.d'
import { ActionCreatorsPropType, FilesPropType, LabelsPropType } from 'declarations/types.pt'

type FileNames = {[k: string]: string};
export type GeneratedPDFs = {[k: string]: File};

export interface GeneratePDFProps {
  actions: ActionCreators;
  files: Files;
  generatingPDF: boolean;
  generatedPDFs: GeneratedPDFs;
  labels: Labels;
  recipes: Recipes;
  setStep: (s: Step) => void;
  watermark: Watermark;
}

const GeneratePDF: React.FC<GeneratePDFProps> = ({
  actions, files, generatingPDF, generatedPDFs, labels, recipes, watermark, setStep
}: GeneratePDFProps): JSX.Element => {
  const [_fileNames, setFileNames] = useState<FileNames>({})
  const [mounted, setMounted] = useState<boolean>(false)
  const _refs: {[k: string]: any} = _.mapValues(recipes, () => React.createRef())

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

  const setKeys = (generatedPDFs: GeneratedPDFs): FileNames => {
    const newfileNames: FileNames = {}
    Object.keys(generatedPDFs).forEach(key => {
      newfileNames[key] = generatedPDFs[key].name
    })
    return newfileNames
  }

  useEffect(() => {
    if (mounted && !_.isEmpty(generatedPDFs) && _.isEmpty(_fileNames)) {
      setFileNames(setKeys(generatedPDFs))
    }
  }, [generatedPDFs, _fileNames, mounted])

  const onBackButtonClick = () => {
    setStep('edit')
  }

  const onForwardButtonClick = () => {
    actions.clearPDF()
  }

  const setFileName = (key: string, value: string) => {
    const newFileNames: FileNames = _.clone(_fileNames)
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
            const pdf: File = generatedPDFs[key]
            return (
              <div key={key} className='fieldset animate'>
                <div className='pdfrow'>
                  <FileFC file={pdf} />
                  <div className='ml-4'>
                    <Nav.Input
                      label={labels.filename} value={_fileNames[key]}
                      onChange={(e) => setFileName(key, e.target.value)}
                    />
                    <a
                      className='hiddenLink' ref={_refs[key]}
                      onClick={(e) => e.stopPropagation()} title={labels.label_download}
                      href={'data:application/octet-stream;base64,' + encodeURIComponent(pdf.content.base64!)}
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
  actions: ActionCreatorsPropType.isRequired,
  files: FilesPropType.isRequired,
  generatingPDF: PT.bool.isRequired,
  generatedPDFs: PT.any.isRequired,
  labels: LabelsPropType.isRequired,
  recipes: RecipesPropType.isRequired,
  setStep: PT.func.isRequired,
  watermark: WatermarkPropType.isRequired
}

export default GeneratePDF
