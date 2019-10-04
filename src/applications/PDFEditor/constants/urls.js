export const HOST = window.location.hostname
const FULL_HOST = window.location.protocol + '//' + HOST
export const BASE_URL = FULL_HOST + (window.location.port ? ':' + window.location.port : '')
const BACKEND_URL = HOST === 'localhost' ? BASE_URL : BASE_URL + '/backend'

const PDF_URL = BACKEND_URL + '/pdf'

// PdfController
export const PDF_GENERATE_URL = PDF_URL + '/generate'

