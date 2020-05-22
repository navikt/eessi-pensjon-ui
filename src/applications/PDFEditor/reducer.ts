import { ModalContent } from 'declarations/components'
import { PickImageStep, PickPageStep, Recipes, RecipeType, Separator, Watermark } from 'declarations/PDFEditor.d'
import _ from 'lodash'
import { IFile, Files } from 'forhandsvisningsfil/lib/index.d'
import { ActionWithPayload } from 'declarations/types.d'
import * as types from './constants/actionTypes'

export interface State {
  recipes: Recipes;
  files: Files;
  generatingPDFs: boolean;
  generatedPDFs: any;
  pageScale: number;
  dndTarget: RecipeType;
  loadingPDF: boolean;
  modal: ModalContent | undefined;
  watermark: Watermark;
  separator: Separator;
  status: string | undefined;
  step: number;
}

export const initialState: State = {
  recipes: {},
  files: [],
  generatingPDFs: false,
  generatedPDFs: undefined,
  pageScale: 1.0,
  dndTarget: 'work',
  loadingPDF: false,
  modal: undefined,
  watermark: {
    watermarkText: '',
    watermarkTextColor: {
      r: 255, g: 0, b: 0, a: 0.25
    }
  },
  separator: {
    separatorText: '',
    separatorTextColor: {
      r: 0, g: 0, b: 0, a: 1.0
    }
  },
  status: undefined,
  step: 0
}

const mainReducer = (state: State = initialState, action: ActionWithPayload) => {
  let status

  if (_.endsWith(action.type, '/REQUEST')) {
    status = undefined
  }

  if (_.endsWith(action.type, '/FAILURE')) {
    status = 'ERROR'
  }

  if (_.endsWith(action.type, '/SUCCESS')) {
    status = 'OK'
  }

  switch (action.type) {
    case types.PDF_SELECTED: {
      const newRecipes: Recipes = _.clone(state.recipes)
      const existingPDF = action.payload.map((pdf: File) => { return pdf.name })

      for (var i in newRecipes) {
        newRecipes[i as RecipeType] = _.filter(newRecipes[i as RecipeType], (step) => {
          if (!_.has(step, 'name')) {
            return false
          }
          return existingPDF.indexOf((step as PickImageStep | PickPageStep).name) >= 0
        })
      }

      return {
        ...state,
        files: action.payload,
        recipes: newRecipes
      }
    }

    case types.PDF_CLEAR: {
      return {
        ...state,
        files: undefined
      }
    }

    case types.PDF_GENERATE_SUCCESS: {
      return {
        ...state,
        generatingPDF: false,
        generatedPDFs: action.payload,
        status: status
      }
    }

    case types.PDF_SET_RECIPES:

      return {
        ...state,
        recipes: action.payload
      }

    case types.PDF_SET_DND_TARGET:

      return {
        ...state,
        dndTarget: action.payload
      }

    case types.PDF_SET_PAGE_SIZE:

      return {
        ...state,
        pageScale: action.payload
      }

    case types.PDF_WATERMARK_SET : {
      return {
        ...state,
        watermark: action.payload
      }
    }

    case types.PDF_SEPARATOR_SET : {
      return {
        ...state,
        separator: action.payload
      }
    }

    case types.PDF_GENERATE_REQUEST:

      return {
        ...state,
        generatingPDF: true,
        status: status
      }

    case types.PDF_GENERATE_FAILURE:

      return {
        ...state,
        generatingPDF: false,
        status: status
      }

    case types.PDF_LOADING_FILES_STARTED:

      return {
        ...state,
        loadingPDF: true,
        status: status
      }

    case types.PDF_LOADING_FILES_FINISHED:

      return {
        ...state,
        loadingPDF: false,
        status: 'OK'
      }

    case types.PDF_MODAL_SET:
      return {
        ...state,
        modal: action.payload
      }

    default:

      return state
  }
}

export default mainReducer
