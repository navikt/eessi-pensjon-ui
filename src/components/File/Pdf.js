import React from 'react'
import PT from 'prop-types'
import { Document, Page } from 'react-pdf'
import classNames from 'classnames'
import './Pdf.css'

export const Pdf = ({ className, currentPage, file, height, labels, numberPages, onContentClick, onLoadSuccess, scale, size, width }) => (
  <div
    className={classNames('c-file-Pdf', className)}
    title={'' + file.name + '\n' + labels.pages + ': ' + (numberPages || '0') + '\n' + labels.size + ': ' + size}
  >
    <Document
      className='position-relative'
      file={'data:application/pdf;base64,' + file.content.base64}
      onLoadSuccess={onLoadSuccess}
    >
      <div
        className={classNames('page', 'paper')}
        onClick={onContentClick}
      >
        <Page
          width={(width || 100) * scale}
          height={(height || 140) * scale}
          renderMode='svg'
          pageNumber={currentPage}
        />
      </div>
    </Document>
  </div>
)

Pdf.propTypes = {
  className: PT.string,
  currentPage: PT.number,
  file: PT.object.isRequired,
  height: PT.number,
  labels: PT.object.isRequired,
  numberPages: PT.number,
  onLoadSuccess: PT.func,
  onContentClick: PT.func,
  scale: PT.number.isRequired,
  size: PT.string,
  width: PT.number
}

Pdf.displayName = 'Pdf'
export default Pdf
