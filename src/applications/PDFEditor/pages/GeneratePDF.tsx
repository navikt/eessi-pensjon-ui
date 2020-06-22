import File, { IFile, Files } from 'forhandsvisningsfil'
import { Recipes, Step, Watermark } from 'declarations/PDFEditor.d'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as pdfActions from '../actions/pdf'
import { State } from '../reducer'

type FileNames = {[k: string]: string};
export type GeneratedPDFs = {[k: string]: IFile};

export interface GeneratePDFProps {
  labels: Labels;
  setStep: (s: Step) => void;
}

const GeneratePDF: React.FC<GeneratePDFProps> = ({
  labels, setStep
}: GeneratePDFProps): JSX.Element => {
  const [_fileNames, setFileNames] = useState<FileNames>({})
  const [mounted, setMounted] = useState<boolean>(false)
  const dispatch = useDispatch()
  const watermark = useSelector<State, Watermark>(state => state.watermark)
  const recipes: Recipes = useSelector<State, Recipes>(state => state.recipes)
  const files: Files = useSelector<State, Files>(state => state.files)
  const generatingPDFs: boolean = useSelector<State, boolean>(state => state.generatingPDFs)
  const generatedPDFs: GeneratedPDFs = useSelector<State, GeneratedPDFs>(state => state.generatedPDFs)
  const _refs: {[k: string]: any} = _.mapValues(recipes, () => React.createRef())

  useEffect(() => {
    if (!mounted && files) {
      dispatch(pdfActions.generatePDF({
        recipes: recipes,
        files: files,
        watermark: watermark
      }))
      setMounted(true)
    }
  }, [mounted, dispatch, files, recipes, watermark])

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
    dispatch(pdfActions.clearPDF())
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

  const buttonText = generatingPDFs ? labels.loading_generatingPDF : labels.label_startAgain

  return (
    <div>
      {generatingPDFs ? (
        <div className='w-100 text-center'>
          <Nav.Spinner />
          <p className='typo-normal'>{labels.loading_generatingPDF}</p>
        </div>
      ) : (generatedPDFs ? (
        <div>
          {Object.keys(generatedPDFs).map(key => {
            const pdf: IFile = generatedPDFs[key]
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
          <Nav.Knapp disabled={generatingPDFs} className='ml-3 forwardButton' onClick={onForwardButtonClick}>{buttonText}</Nav.Knapp>
          <Nav.Flatknapp className='backButton ml-3' onClick={onBackButtonClick}>{labels.label_back}</Nav.Flatknapp>
        </Nav.Column>
      </Nav.Row>
    </div>
  )
}

GeneratePDF.propTypes = {
  labels: LabelsPropType.isRequired,
  setStep: PT.func.isRequired
}

export default GeneratePDF
