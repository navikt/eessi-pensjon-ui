import * as api from 'actions/api'
import { GeneratePayload, Recipes, Separator, Watermark } from 'declarations/PDFEditor.d'
import { Files } from 'forhandsvisningsfil/lib/forhandsvisningsfil.d'
import * as types from 'applications/PDFEditor/constants/actionTypes'
import * as urls from 'applications/PDFEditor/constants/urls'

export const selectPDF = (files: Files) => {
  return {
    type: types.PDF_SELECTED,
    payload: files
  }
}

export const loadingFilesStart = () => {
  return {
    type: types.PDF_LOADING_FILES_STARTED
  }
}

export const loadingFilesEnd = () => {
  return {
    type: types.PDF_LOADING_FILES_FINISHED
  }
}

export const clearPDF = () => {
  return {
    type: types.PDF_CLEAR
  }
}

export const setRecipes = (recipes: Recipes) => {
  return {
    type: types.PDF_SET_RECIPES,
    payload: recipes
  }
}

export const setActiveDnDTarget = (target: string) => {
  return {
    type: types.PDF_SET_DND_TARGET,
    payload: target
  }
}

export const setPdfSize = (size: number) => {
  return {
    type: types.PDF_SET_PAGE_SIZE,
    payload: size
  }
}

export const setWatermark = (payload: Watermark) => {
  return {
    type: types.PDF_WATERMARK_SET,
    payload: payload
  }
}

export const setSeparator = (payload: Separator) => {
  return {
    type: types.PDF_SEPARATOR_SET,
    payload: payload
  }
}

export const setModal = (payload: any) => {
  return {
    type: types.PDF_MODAL_SET,
    payload: payload
  }
}

export const generatePDF = (payload: GeneratePayload) => {
  return api.call({
    url: urls.PDF_GENERATE_URL,
    method: 'POST',
    payload: payload,
    type: {
      request: types.PDF_GENERATE_REQUEST,
      success: types.PDF_GENERATE_SUCCESS,
      failure: types.PDF_GENERATE_FAILURE
    }
  })
}
