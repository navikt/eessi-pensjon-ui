import { RecipeType, Step } from 'declarations/PDFEditor'
import PT from 'prop-types'

export const SpecialPageStepPropType = PT.shape({
  separatorText: PT.string,
  separatorTextColor: PT.shape({
    r: PT.number.isRequired,
    g: PT.number.isRequired,
    b: PT.number.isRequired,
    a: PT.number.isRequired
  }).isRequired,
  type: PT.string.isRequired
})

export const PickImageStepPropType = PT.shape({
  name: PT.string.isRequired,
  type: PT.string.isRequired
})

export const PickPageStepPropType = PT.shape({
  name: PT.string.isRequired,
  type: PT.string.isRequired,
  pageNumber: PT.number.isRequired
})

export const RecipeStepPropType = PT.oneOf([SpecialPageStepPropType, PickImageStepPropType, PickPageStepPropType])

export const WatermarkPropType = PT.shape({
  watermarkText: PT.string.isRequired,
  watermarkTextColor: PT.shape({
    r: PT.number.isRequired,
    g: PT.number.isRequired,
    b: PT.number.isRequired,
    a: PT.number.isRequired
  }).isRequired
})

export const SeparatorPropType = PT.shape({
  separatorText: PT.string.isRequired,
  separatorTextColor: PT.shape({
    r: PT.number.isRequired,
    g: PT.number.isRequired,
    b: PT.number.isRequired,
    a: PT.number.isRequired
  }).isRequired
})

export const RecipeTypePropType = PT.oneOf<RecipeType>(['work', 'home', 'sick', 'other'])

export const RecipeStepsPropType = PT.arrayOf(RecipeStepPropType.isRequired)

export const RecipesPropType = PT.object

export const Steps: Array<Step> = ['select', 'edit', 'generate']

export const StepPropType = PT.oneOf<Step>(Steps)
