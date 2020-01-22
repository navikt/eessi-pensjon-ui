import reducer, { initialState } from './reducer'
import * as types from './constants/actionTypes'

describe('reducers/pdf', () => {
  const simulate = (type: string, param: string, initialBool: boolean, status: string | undefined) => {
    expect(
      reducer({
        ...initialState,
        [param]: initialBool
      }, {
        type: type,
        payload: undefined
      })
    ).toEqual({
      ...initialState,
      [param]: !initialBool,
      status: status
    })
  }

  const simulateRequest = (type: string, param: string) => {
    return simulate(type, param, false, undefined)
  }

  const simulateSuccess = (type: string, param: string) => {
    return simulate(type, param, true, 'OK')
  }

  const simulateFailure = (type: string, param: string) => {
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
