import { IFiles, IFilesPropType } from 'components/File/File'
import Icons from 'components/Icons/Icons'
import { Recipes, Step } from 'declarations/PDFEditor.d'
import { RecipesPropType, StepPropType, Steps } from 'declarations/PDFEditor.pt'
import _ from 'lodash'
import { Stegindikator } from 'Nav'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Labels } from 'declarations/types'

export interface StepIndicatorProps {
  files: IFiles;
  labels: Labels;
  recipes: Recipes;
  step: Step;
  setStep: (step: Step) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  files, labels, recipes, step, setStep
}: StepIndicatorProps): JSX.Element => {
  const [message, setMessage] = useState<string |undefined>(undefined)

  const hasOnlyEmptyRecipes = (recipes: Recipes) => {
    return _.every(recipes, (recipe) => _.isEmpty(recipe))
  }

  const onBeforeChange = (nextStep: number) => {
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

  const onChange = (nextStep: number) => {
    setStep(Steps[nextStep])
  }

  const stepIndicator = Steps.indexOf(step)
  return (
    <div className='mb-4'>
      <Stegindikator
        visLabel
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        autoResponsiv
        aktivtSteg={stepIndicator}
        steg={[
          { label: labels.step_1!, aktiv: (stepIndicator === 0), index: 0 },
          { label: labels.step_2!, aktiv: (stepIndicator === 1), index: 1 },
          { label: labels.step_3!, aktiv: (stepIndicator === 2), index: 2 }
        ]}
      />
      {message ? (
        <div className='w-100 text-center mb-2'>
          <Icons kind='advarsel' size={16} />
          <span className='ml-2'>{message}</span>
        </div>
      ) : null}
    </div>
  )
}

StepIndicator.propTypes = {
  files: IFilesPropType.isRequired,
  recipes: RecipesPropType.isRequired,
  step: StepPropType.isRequired,
  setStep: PT.func.isRequired
}

export default StepIndicator
