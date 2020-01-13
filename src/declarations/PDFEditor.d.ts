import { RGBColor } from 'react-color'

export interface SpecialPageStep {
  separatorText: string;
  separatorTextColor: RGBColor;
  type: 'specialPage';
}


export interface PickImageStep {
  name: string;
  type: 'pickImage';
}

export interface PickPageStep {
  name: string;
  type: 'pickPage';
  pageNumber: number;
}

export type RecipeStep = PickImageStep | PickPageStep | SpecialPageStep;

export interface Watermark {
  watermarkText: string;
  watermarkTextColor: RGBColor;
}

export interface Separator {
  separatorText: string;
  separatorTextColor: RGBColor;
}

export interface GeneratePayload {
  recipes: Recipes,
  files: Files,
  watermark: Watermark
}

export type RecipeType = 'work' | 'home' | 'sick' | 'other'

export type RecipeSteps = Array<RecipeStep>

export type Recipes = {[k in RecipeType]?: RecipeSteps}

export type Step = 'select' | 'edit' | 'generate'
