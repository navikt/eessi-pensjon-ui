import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import * as Nav from '../../../Nav'
import Editor from '../components/Editor/Editor'

const EditPDF = (props) => {
  const { actions, labels, recipes, setStep } = props
  const hasOnlyEmptyRecipes = (recipes) => {
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
        {...props}
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
            onClick={onBackButtonClick}>
            {labels.button_back}
          </Nav.Knapp>
        </Nav.Column>
      </Nav.Row>
    </div>
  )
}

EditPDF.propTypes = {
  actions: PT.object,
  labels: PT.object,
  files: PT.array,
  pageScale: PT.number,
  recipes: PT.object
}

export default EditPDF
