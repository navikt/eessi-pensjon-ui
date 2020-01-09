
export interface RecipeStep {
  name: string;
  type: 'pickImage' | 'pickPage',
  pageNumber ?: number;
}

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

export type RecipeSteps = Array<RecipeStep>

export type Recipes = {[k in RecipeType]?: RecipeSteps}

export interface File {
  name: string;
  size: number;
  mimetype: string;
  content: {
    base64: string;
  }
}

export type Labels = {[key: string] : string}

export type Files = Array<File>
