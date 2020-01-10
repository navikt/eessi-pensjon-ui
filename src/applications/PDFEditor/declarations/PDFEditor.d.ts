import PT from 'prop-types'

export interface RecipeStep {
  name: string;
  type: 'pickImage' | 'pickPage',
  pageNumber ?: number;
}

export const RecipeStepPropType = PT.shape({
  name: PT.string.isRequired,
  type: PT.oneOf(['pickImage', 'pickPage']),
  pageNumber: PT.number
})

export interface Watermark {

}

export interface Separator {

}

export interface GeneratePayload {
  recipes: Recipes,
  files: Files,
  watermark: Watermark
}

export type RecipeType = 'work' | 'home' | 'sick' | 'other'

export const RecipeTypePropType = PT.oneOf<RecipeType>(['work', 'home', 'sick', 'other'])

export type RecipeSteps = Array<RecipeStep>

export const RecipeStepsPropType = PT.arrayOf(RecipeStepPropType.isRequired)

export type Recipes = {[k in RecipeType]?: RecipeSteps}

export const RecipesPropType = PT.object
