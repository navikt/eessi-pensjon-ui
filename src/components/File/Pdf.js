import React, { useState, useEffect } from 'react'
import PT from 'prop-types'
import { pdfjs, Document, Page } from 'react-pdf'
import pdfjsWorker from 'react-pdf/src/pdf.worker.entry'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import './Pdf.css'
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export const Pdf = ({
  addLink, animate, className, currentPage, deleteLink, downloadLink, file, height, initialNumberPages, index, isHovering,
  labels = { size: 'Størrelse', download: 'Last ned', pages: 'Sider' }, onAddFile, onClick, onDeleteDocument, onLoadSuccess,
  onNextPage, onPreviewDocument, onPreviousPage, previewLink, scale, size, width
}) => {
  const [_currentPage, setCurrentPage] = useState(1)
  const [_numberPages, setNumberPages] = useState(initialNumberPages)
  const title = '' + file.name + '\n' + labels.pages + ': ' + (_numberPages || '0') + '\n' + labels.size + ': ' + size

  useEffect(() => {
    if (currentPage && !isNaN(currentPage) && currentPage !== _currentPage) {
      setCurrentPage(currentPage)
    }
  }, [currentPage, _currentPage])

  const handleOnLoadSuccess = (e) => {
    setNumberPages(e.numPages)
    if (typeof onLoadSuccess === 'function') {
      onLoadSuccess(index, e)
    }
  }

  const handleOnDeleteDocument = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(1)
    if (typeof onDeleteDocument === 'function') {
      onDeleteDocument(index)
    }
  }

  const handleOnPreviewDocument = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (typeof onPreviewDocument === 'function') {
      onPreviewDocument(file)
    }
  }

  const handleOnAddFile = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (typeof onAddFile === 'function') {
      onAddFile(file)
    }
  }

  const handlePreviousPageRequest = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(_currentPage - 1)
    if (onPreviousPage && typeof onPreviousPage === 'function') {
      onPreviousPage(index)
    }
  }

  const handleNextPageRequest = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(_currentPage + 1)
    if (onNextPage && typeof onNextPage === 'function') {
      onNextPage(index)
    }
  }

  return (
    <div
      className={classNames('c-file-Pdf', className, { animate: animate })}
      title={title}
    >
      <Document
        className='position-relative'
        file={'data:application/pdf;base64,' + file.content.base64}
        onLoadSuccess={handleOnLoadSuccess}
        setNumberPages={setNumberPages}
      >
        {previewLink && isHovering
          ? (
            <div
              className='link previewLink'
              onClick={handleOnPreviewDocument}
            >
              <Icons style={{ cursor: 'pointer' }} size='1x' kind='view' />
            </div>
          ) : null}
        {deleteLink && isHovering
          ? (
            <div
              className='link deleteLink'
              onClick={handleOnDeleteDocument}
            >
              <Icons kind='trashcan' size={15} />
            </div>
          ) : null}
        {addLink && isHovering
          ? (
            <div
              className='link addLink'
              onClick={handleOnAddFile}
            >
              <Icons kind='vedlegg' size={20} />
            </div>
          ) : null}
        {downloadLink && isHovering
          ? (
            <div
              className='link downloadLink'
            >
              <a
                onClick={(e) => e.stopPropagation()}
                title={labels.download}
                href={'data:application/octet-stream;base64,' + encodeURIComponent(file.content.base64)}
                download={file.name}
              >
                <Icons size='sm' kind='download' />
              </a>
            </div>
          ) : null}
        {_currentPage > 1 && isHovering
          ? (
            <a
              href='#previousPage'
              className='previousPage'
              onClick={handlePreviousPageRequest}
            >
              {'◀'}
            </a>
          ) : null}
        {_currentPage < _numberPages && isHovering
          ? (
            <a
              href='#nextPage'
              className='nextPage'
              onClick={handleNextPageRequest}
            >
              {'▶'}
            </a>
          ) : null}
        {isHovering
          ? (
            <div className='pageNumber'>
              {_currentPage}
            </div>
          ) : null}
        <div
          className={classNames('page', 'paper')}
          onClick={onClick}
        >
          <Page width={width || 100 * scale} height={height || 140 * scale} renderMode='svg' pageNumber={_currentPage} />
        </div>
      </Document>
    </div>
  )
}

Pdf.propTypes = {
  addLink: PT.bool,
  animate: PT.bool,
  className: PT.string,
  currentPage: PT.number,
  deleteLink: PT.bool,
  downloadLink: PT.bool,
  file: PT.object.isRequired,
  height: PT.number,
  labels: PT.object,
  initialNumberPages: PT.number,
  isHovering: PT.bool,
  onAddFile: PT.func,
  onClick: PT.func,
  onDeleteDocument: PT.func,
  onLoadSuccess: PT.func,
  onNextPage: PT.func,
  onPreviousPage: PT.func,
  onPreviewDocument: PT.func,
  previewLink: PT.bool,
  scale: PT.number.isRequired,
  size: PT.string,
  width: PT.number
}

Pdf.displayName = 'Pdf'
export default Pdf
