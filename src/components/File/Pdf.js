import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import { Document, Page } from 'react-pdf'
import classNames from 'classnames'
import './Pdf.css'

export const Pdf = ({
  className, currentPage, file, height, labels, numberPages, onContentClick, onLoadSuccess, scale, size, tema, width
}) => (
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
        className={classNames('page', tema)}
        onClick={onContentClick}
      >
        <Page
          width={_.isString(width) ? width : (width || 100) * scale}
          height={_.isString(height) ? height : (height || 140) * scale}
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
  height: PT.oneOfType([PT.number, PT.string]),
  labels: PT.object.isRequired,
  numberPages: PT.number,
  onLoadSuccess: PT.func,
  onContentClick: PT.func,
  scale: PT.number.isRequired,
  size: PT.string,
  tema: PT.oneOf(['paper', 'simple']),
  width: PT.oneOfType([PT.number, PT.string])
}

Pdf.displayName = 'Pdf'
export default Pdf
