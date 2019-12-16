import { FileProps, IFile } from 'components/File/File'
import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import { Document, Page } from 'react-pdf'
import classNames from 'classnames'
import './Pdf.css'

export const Pdf: React.FC<FileProps> = ({
  className, currentPage, file, height, labels, numberPages, onClick, onLoadSuccess, scale, size, tema, width
}: FileProps): JSX.Element => (
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
        onClick={onClick}
      >
        <Page
          width={_.isString(width) ? width : (width || 100) * scale!}
          height={_.isString(height) ? height : (height || 140) * scale!}
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
  file: PT.oneOf<IFile>([]).isRequired,
  height: PT.number,
  labels: PT.object.isRequired,
  numberPages: PT.number,
  onLoadSuccess: PT.func,
  onClick: PT.func.isRequired,
  scale: PT.number.isRequired,
  size: PT.string.isRequired,
  tema: PT.oneOf(['paper', 'simple']),
  width: PT.number
}

Pdf.displayName = 'Pdf'
export default Pdf
