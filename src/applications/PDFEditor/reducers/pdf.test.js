import pdfReducer, { initialPdfState } from './pdf.js'
import * as types from '../constants/actionTypes'

describe('reducers/pdf', () => {
  const simulate = (type, param, initialBool, status) => {
    expect(
      pdfReducer({
        ...initialPdfState,
        [param]: initialBool
      }, {
        type: type
      })
    ).toEqual({
      ...initialPdfState,
      [param]: !initialBool,
      status: status
    })
  }

  const simulateRequest = (type, param) => {
    return simulate(type, param, false, undefined)
  }

  const simulateSuccess = (type, param) => {
    return simulate(type, param, true, 'OK')
  }

  const simulateFailure = (type, param) => {
    return simulate(type, param, true, 'ERROR')
  }

  it('PDF_GENERATE_REQUEST', () => {
    simulateRequest(types.PDF_GENERATE_REQUEST, 'generatingPDF')
  })

  it('PDF_GENERATE_SUCCESS', () => {
    simulateSuccess(types.PDF_GENERATE_SUCCESS, 'generatingPDF')
  })

  it('PDF_GENERATE_FAILURE', () => {
    simulateFailure(types.PDF_GENERATE_FAILURE, 'generatingPDF')
  })

  it('PDF_LOADING_FILES_STARTED', () => {
    simulateRequest(types.PDF_LOADING_FILES_STARTED, 'loadingPDF')
  })

  it('PDF_LOADING_FILES_FINISHED', () => {
    simulateSuccess(types.PDF_LOADING_FILES_FINISHED, 'loadingPDF')
  })
})
