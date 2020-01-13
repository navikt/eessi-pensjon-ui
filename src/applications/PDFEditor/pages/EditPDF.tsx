import {
  Recipes,
  RecipeType,
  Separator,
  Step,
  Watermark
} from 'declarations/PDFEditor.d'
import {
  RecipesPropType,
  RecipeTypePropType,
  SeparatorPropType,
  WatermarkPropType
} from 'declarations/PDFEditor.pt'
import { IFiles, IFilesPropType } from 'components/File/File'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React from 'react'
import { ActionCreators, Labels } from 'declarations/types.d'
import {  ActionCreatorsPropType, LabelsPropType } from 'declarations/types.pt'
import Editor from '../components/Editor/Editor'

export interface EditPDFProps {
  actions: ActionCreators;
  dndTarget: RecipeType;
  files: IFiles;
  labels: Labels;
  pageScale: number;
  recipes: Recipes;
  separator: Separator;
  setStep: (s: Step) => void;
  watermark: Watermark;
}

const EditPDF: React.FC<EditPDFProps> = ({
  actions, dndTarget, files, labels, pageScale, recipes, separator, setStep, watermark
}: EditPDFProps): JSX.Element => {
  const hasOnlyEmptyRecipes = (recipes: Recipes) => {
    return _.every(recipes, (recipe) => _.isEmpty(recipe))
  }

  const onForwardButtonClick = () => {
    if (hasOnlyEmptyRecipes(recipes)) {
      actions.setModal({
        modalTitle: labels.modal_empty_title,
        modalText: labels.modal_empty_text,
        modalButtons: [{
          main: true,
          text: labels.modal_ok
        }]
      })
    } else {
      actions.setModal({
        modalTitle: labels.modal_valid_title,
        modalText: labels.modal_valid_text,
        modalButtons: [{
          main: true,
          text: labels.modal_yes,
          onClick: () => setStep('generate')
        }, {
          text: labels.modal_cancel
        }]
      })
    }
  }

  const onBackButtonClick = () => {
    setStep('select')
  }

  return (
    <div className='documentbox fieldset m-0 mt-4'>
      <Editor
        actions={actions}
        dndTarget={dndTarget}
        files={files}
        labels={labels}
        pageScale={pageScale}
        recipes={recipes}
        targets={['work', 'home', 'sick', 'other']}
        separator={separator}
        watermark={watermark}
      />
      <Nav.Row className='mb-4'>
        <Nav.Column>
          <Nav.Hovedknapp
            className='forwardButton'
            disabled={hasOnlyEmptyRecipes(recipes)}
            onClick={onForwardButtonClick}
          >
            {labels.button_forward}
          </Nav.Hovedknapp>
          <Nav.Knapp
            className='backButton ml-3'
            onClick={onBackButtonClick}
          >
            {labels.button_back}
          </Nav.Knapp>
        </Nav.Column>
      </Nav.Row>
    </div>
  )
}

EditPDF.propTypes = {
  actions: ActionCreatorsPropType.isRequired,
  dndTarget: RecipeTypePropType.isRequired,
  files: IFilesPropType.isRequired,
  labels: LabelsPropType.isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired,
  separator: SeparatorPropType.isRequired,
  setStep: PT.func.isRequired,
  watermark: WatermarkPropType.isRequired
}

export default EditPDF
