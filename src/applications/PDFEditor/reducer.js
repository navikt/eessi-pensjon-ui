import pdfReducer, { initialPdfState } from './reducers/pdf'
import uiReducer, { initialUiState } from './reducers/ui'

const mainReducer = (state, action) => {
  return {
    pdf: pdfReducer(state.pdf, action),
    ui: uiReducer(state.ui, action)
  }
}

export const initialState = {
  pdf: initialPdfState,
  ui: initialUiState
}

export default mainReducer
