import React, { useState } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import { Stegindikator } from '../../../Nav'
import Icons from 'components/Icons/Icons'

const steps = ['select', 'edit', 'generate']

const StepIndicator = ({ files, labels, recipes, step, setStep }) => {
  const [message, setMessage] = useState(undefined)

  const hasOnlyEmptyRecipes = (recipes) => {
    return _.every(recipes, (recipe) => _.isEmpty(recipe))
  }

  const onBeforeChange = (nextStep) => {
    if (nextStep === stepIndicator) {
      return false
    }
    if (nextStep === 1 && _.isEmpty(files)) {
      setMessage(labels.alert_invalidStep1)
      return false
    }
    if (nextStep === 2 && hasOnlyEmptyRecipes(recipes)) {
      setMessage(labels.alert_invalidStep2)
      return false
    }
    setMessage(undefined)
    return true
  }

  const onChange = (nextStep) => {
    setStep(steps[nextStep])
  }

  const stepIndicator = steps.indexOf(step)
  return (
    <>
      <Stegindikator
        visLabel
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        autoResponsiv
        aktivtSteg={stepIndicator}
        className='mb-4'
        steg={[
          { label: labels.step_1, aktiv: (stepIndicator === 0) },
          { label: labels.step_2, aktiv: (stepIndicator === 1) },
          { label: labels.step_3, aktiv: (stepIndicator === 2) }
        ]}
      />
      {message ? (
        <div className='w-100 text-center mb-2'>
          <Icons kind='advarsel' size={16} />
          <span className='ml-2'>{message}</span>
        </div>
      ) : null}
    </>
  )
}

StepIndicator.propTypes = {
  files: PT.array,
  recipes: PT.object,
  step: PT.string.isRequired,
  setStep: PT.func.isRequired
}

export default StepIndicator
