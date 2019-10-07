import * as types from '../constants/actionTypes'
import _ from 'lodash'

export const initialPdfState = {
  recipe: {},
  files: [],
  pageScale: 1.0,
  dndTarget: 'work',
  loadingPDF: false,
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

const pdfReducer = (state = initialPdfState, action = {}) => {
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
      const newRecipe = _.clone(state.recipe)
      const existingPDF = action.payload.map(pdf => { return pdf.name })

      for (var i in newRecipe) {
        newRecipe[i] = _.filter(newRecipe[i], (step) => {
          return existingPDF.indexOf(step.name) >= 0
        })
      }

      return {
        ...state,
        files: action.payload,
        recipe: newRecipe
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

    case types.PDF_SET_RECIPE:

      return {
        ...state,
        recipe: action.payload
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

    default:

      return state
  }
}

export default pdfReducer
