import classNames from 'classnames'
import { FileProps } from 'components/File/File'
import { FilePropType } from 'declarations/types.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'
import { Document, Page } from 'react-pdf'
import './Pdf.css'

export const Pdf: React.FC<FileProps> = ({
  className, currentPage, file, height, labels,
  numberPages, onClick, onLoadSuccess, overlay,
  size, tema, viewOnePage = true, width
}: FileProps): JSX.Element => {
  return (
    <div
      className={classNames('c-file-Pdf', className)}
      title={'' + file.name + '\n' + labels.pages + ': ' + (numberPages || '0') + '\n' + labels.size + ': ' + size}
    >
      {overlay}
      <Document
        className='position-relative'
        file={'data:application/pdf;base64,' + file.content.base64}
        onLoadSuccess={onLoadSuccess}
      >
        <div
          className={classNames('page', tema)}
          onClick={onClick}
        >
          {viewOnePage ? (
            <Page
              width={width}
              height={height}
              renderMode='svg'
              pageNumber={currentPage}
            />)
            : _.range(1, (numberPages! + 1)).map(i => (
              <Page
                key={i}
                width={width}
                height={height}
                renderMode='svg'
                pageNumber={i}
              />
            ))}
        </div>
      </Document>
    </div>
  )
}

Pdf.propTypes = {
  className: PT.string,
  currentPage: PT.number,
  file: FilePropType.isRequired,
  height: PT.number.isRequired,
  labels: PT.object.isRequired,
  numberPages: PT.number,
  onLoadSuccess: PT.func,
  onClick: PT.func.isRequired,
  overlay: PT.element.isRequired,
  size: PT.string.isRequired,
  tema: PT.oneOf(['paper', 'simple']),
  width: PT.number.isRequired
}

Pdf.displayName = 'Pdf'
export default Pdf
