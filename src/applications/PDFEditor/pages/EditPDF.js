import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import * as Nav from '../../../Nav'
import PDFEditor from '../components/PDFEditor/PDFEditor'

const EditPDF = ({ actions, labels, recipe, setStep }) => {
  const hasOnlyEmptyArrays = (obj) => {
    var emptyArrayMembers = _.filter(obj, (it) => {
      return !it || (_.isArray(it) && _.isEmpty(it))
    })
    return emptyArrayMembers.length === Object.keys(obj).length
  }

  const onForwardButtonClick = () => {
    if (hasOnlyEmptyArrays(recipe)) {
      actions.openModal({
        modalTitle: labels['recipe-empty-title'],
        modalText: labels['recipe-empty-text'],
        modalButtons: [{
          main: true,
          text: labels['ok-got-it'],
          onClick: actions.closeModal()
        }]
      })
    } else {
      actions.openModal({
        modalTitle: labels['recipe-valid-title'],
        modalText: labels['recipe-valid-text'],
        modalButtons: [{
          main: true,
          text: labels.yes + ', ' + labels.generate,
          onClick: goToGenerate
        }, {
          text: labels.cancel,
          onClick: actions.closeModal()
        }]
      })
    }
  }

  const goToGenerate = () => {
    actions.closeModal()
    setStep('generate')
  }

  const onBackButtonClick = () => {
    setStep('select')
  }

  return (
    <div className='documentbox fieldset m-0 mt-4'>
      <PDFEditor />
      <Nav.Row className='mb-4'>
        <Nav.Column>
          <Nav.Hovedknapp
            className='forwardButton'
            disabled={hasOnlyEmptyArrays(recipe)}
            onClick={onForwardButtonClick}
          >
            {labels.forward}
          </Nav.Hovedknapp>
          <Nav.Knapp className='backButton ml-3' onClick={onBackButtonClick}>{labels.back}</Nav.Knapp>
        </Nav.Column>
      </Nav.Row>
    </div>
  )
}

EditPDF.propTypes = {
  actions: PT.object,
  labels: PT.object,
  files: PT.array.isRequired,
  recipe: PT.object.isRequired
}

export default EditPDF
