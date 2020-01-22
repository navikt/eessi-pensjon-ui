import { Recipes, Step } from 'declarations/PDFEditor.d'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as pdfActions from '../actions/pdf'
import Editor from '../components/Editor/Editor'
import { State } from '../reducer'

export interface EditPDFProps {
  labels: Labels;
  setStep: (s: Step) => void;
}

const EditPDF: React.FC<EditPDFProps> = ({
  labels, setStep
}: EditPDFProps): JSX.Element => {
  const dispatch = useDispatch()
  const recipes = useSelector<State, Recipes>(state => state.recipes)
  const hasOnlyEmptyRecipes = (recipes: Recipes) => {
    return _.every(recipes, (recipe) => _.isEmpty(recipe))
  }

  const onForwardButtonClick = () => {
    if (hasOnlyEmptyRecipes(recipes)) {
      dispatch(pdfActions.setModal({
        modalTitle: labels.modal_empty_title,
        modalText: labels.modal_empty_text,
        modalButtons: [{
          main: true,
          text: labels.modal_ok
        }]
      }))
    } else {
      dispatch(pdfActions.setModal({
        modalTitle: labels.modal_valid_title,
        modalText: labels.modal_valid_text,
        modalButtons: [{
          main: true,
          text: labels.modal_yes,
          onClick: () => setStep('generate')
        }, {
          text: labels.modal_cancel
        }]
      }))
    }
  }

  const onBackButtonClick = () => {
    setStep('select')
  }

  return (
    <div className='documentbox fieldset m-0 mt-4'>
      <Editor
        labels={labels}
        recipes={recipes}
        targets={['work', 'home', 'sick', 'other']}
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
  labels: LabelsPropType.isRequired,
  setStep: PT.func.isRequired
}

export default EditPDF
