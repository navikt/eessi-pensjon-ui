import * as api from 'actions/api'
import { Files, GeneratePayload, Recipes } from 'applications/PDFEditor/declarations/PDFEditor'
import * as types from '../constants/actionTypes'
import * as urls from '../constants/urls'
import * as pdfActions from './pdf'

describe('actions/pdf', () => {
  // @ts-ignore
  const call = jest.spyOn(api, 'call').mockImplementation(jest.fn())

  afterEach(() => {
    call.mockReset()
  })

  afterAll(() => {
    call.mockRestore()
  })

  it('selectPDF()', () => {
    const mockFiles: Files = []
    const generatedResult = pdfActions.selectPDF(mockFiles)
    expect(generatedResult).toMatchObject({
      type: types.PDF_SELECTED,
      payload: mockFiles
    })
  })

  it('loadingFilesStart()', () => {
    const generatedResult = pdfActions.loadingFilesStart()
    expect(generatedResult).toMatchObject({
      type: types.PDF_LOADING_FILES_STARTED
    })
  })

  it('loadingFilesEnd()', () => {
    const generatedResult = pdfActions.loadingFilesEnd()
    expect(generatedResult).toMatchObject({
      type: types.PDF_LOADING_FILES_FINISHED
    })
  })

  it('clearPDF()', () => {
    const generatedResult = pdfActions.clearPDF()
    expect(generatedResult).toMatchObject({
      type: types.PDF_CLEAR
    })
  })

  it('setRecipes()', () => {
    const mockRecipes: Recipes = {}
    const generatedResult = pdfActions.setRecipes(mockRecipes)
    expect(generatedResult).toMatchObject({
      type: types.PDF_SET_RECIPES,
      payload: mockRecipes
    })
  })

  it('setActiveDnDTarget()', () => {
    const mockTarget = 'mockTarget'
    const generatedResult = pdfActions.setActiveDnDTarget(mockTarget)
    expect(generatedResult).toMatchObject({
      type: types.PDF_SET_DND_TARGET,
      payload: mockTarget
    })
  })

  it('setPdfSize()', () => {
    const mockSize = 99
    const generatedResult = pdfActions.setPdfSize(mockSize)
    expect(generatedResult).toMatchObject({
      type: types.PDF_SET_PAGE_SIZE,
      payload: mockSize
    })
  })

  it('setWatermark()', () => {
    const mockPayload = { foo: 'bar' }
    const generatedResult = pdfActions.setWatermark(mockPayload)
    expect(generatedResult).toMatchObject({
      type: types.PDF_WATERMARK_SET,
      payload: mockPayload
    })
  })

  it('setSeparator()', () => {
    const mockPayload = { foo: 'bar' }
    const generatedResult = pdfActions.setSeparator(mockPayload)
    expect(generatedResult).toMatchObject({
      type: types.PDF_SEPARATOR_SET,
      payload: mockPayload
    })
  })

  it('generatePDF()', () => {
    const mockPayload: GeneratePayload = { recipes: {}, watermark: 'bar', files: [] }
    pdfActions.generatePDF(mockPayload)
    expect(call).toBeCalledWith({
      type: {
        request: types.PDF_GENERATE_REQUEST,
        success: types.PDF_GENERATE_SUCCESS,
        failure: types.PDF_GENERATE_FAILURE
      },
      method: 'POST',
      payload: mockPayload,
      url: urls.PDF_GENERATE_URL
    })
  })
})
