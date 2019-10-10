import _ from 'lodash'
import * as types from './constants/actionTypes'

export const initialState = {
  recipes: {},
  files: [],
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

const mainReducer = (state = initialState, action) => {
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
      const newRecipes = _.clone(state.recipes)
      const existingPDF = action.payload.map(pdf => { return pdf.name })

      for (var i in newRecipes) {
        newRecipes[i] = _.filter(newRecipes[i], (step) => {
          return existingPDF.indexOf(step.name) >= 0
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
