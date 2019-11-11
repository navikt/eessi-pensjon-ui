import React, { useState } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import bytes from 'bytes'
import Other from './Other'
import Pdf from './Pdf'
import Image from './Image'
import Icons from '../Icons/Icons'
import defaultLabels from './File.labels'
import './File.css'

const renderBytes = (_bytes) => {
  if (!_bytes) {
    return '-'
  }
  return bytes(_bytes)
}

const File = (props) => {
  const {
    animate = true, className, initialPage, file, buttons = 'hover', height, labels = {}, onAddFile = () => {},
    onContentClick = () => {}, onDeleteFile = () => {}, onDownloadFile = () => {}, onLoadSuccess = () => {},
    onPreviewFile = () => {}, onPreviousPage = () => {}, onNextPage = () => {}, showAddButton = false,
    showDeleteButton = false, showDownloadButton = false, showPreviewButton = false, scale = 1.0, width
  } = props

  const [isHovering, setIsHovering] = useState(buttons === 'visible')
  const [_currentPage, setCurrentPage] = useState(initialPage || 1)
  const [_numberPages, setNumberPages] = useState(0)
  const _size = file && file.size !== undefined ? renderBytes(file.size) : 0
  const _labels = { ...defaultLabels, ...labels }
  const onHandleMouseEnter = () => { if (buttons === 'hover') setIsHovering(true) }
  const onHandleMouseOver = () => { if (buttons === 'hover') setIsHovering(true) }
  const onHandleMouseLeave = () => { if (buttons === 'hover') setIsHovering(false) }

  const handlePreviousPageRequest = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(_currentPage - 1)
    if (onPreviousPage && typeof onPreviousPage === 'function') {
      onPreviousPage(file)
    }
  }

  const handleNextPageRequest = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(_currentPage + 1)
    if (onNextPage && typeof onNextPage === 'function') {
      onNextPage(file)
    }
  }

  const handleOnLoadSuccess = (e) => {
    setNumberPages(e.numPages)
    if (typeof onLoadSuccess === 'function') {
      onLoadSuccess({
        ...file,
        numPages: e.numPages
      })
    }
  }

  const isPreviewable = (file) => {
    return file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')
  }

  let Component = Other
  if (file.mimetype && file.mimetype === 'application/pdf') {
    Component = Pdf
  }
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    Component = Image
  }

  return (
    <div
      className={classNames('c-file', className, { animate: animate })}
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
      onMouseOver={onHandleMouseOver}
      style={file.mimetype === 'application/pdf' ? {
        maxWidth: _.isString(width) ? width : ((width || 100) * scale) + 'px',
        maxHeight: _.isString(height) ? height : ((height || 140) * scale) + 'px'
      } : {}}
    >
      <div className='overlay'>
        <div className='top-overlay'>
          {showAddButton && isHovering ? (
            <div
              className='link addLink'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onAddFile(file)
              }}
            >
              <Icons kind='vedlegg' size={20} />
            </div>
          ) : null}
          {showDeleteButton && isHovering ? (
            <div
              className='link deleteLink'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteFile(file)
              }}
            >
              <Icons kind='trashcan' size={16} />
            </div>
          ) : null}
          {showPreviewButton && isHovering && isPreviewable(file) ? (
            <div
              className='link previewLink'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onPreviewFile(file)
              }}
            >
              <Icons style={{ cursor: 'pointer' }} size={16} kind='view' />
            </div>
          ) : null}
          {showDownloadButton && isHovering && file.content ? (
            <div className='link downloadLink'>
              <a
                onClick={(e) => {
                  e.stopPropagation()
                  onDownloadFile(file)
                }}
                title={labels.download}
                href={'data:application/octet-stream;base64,' + encodeURIComponent(file.content.base64)}
                download={file.name}
              >
                <Icons size={16} kind='download' />
              </a>
            </div>
          ) : null}
        </div>
        <div className='middle-overlay'>
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
        </div>
        <div className='bottom-overlay'>
          {isHovering && file.mimetype === 'application/pdf'
            ? (
              <div className='pageNumber'>
                {_currentPage}
              </div>
            ) : null}
        </div>
      </div>
      <Component
        {...props}
        size={_size}
        scale={scale}
        labels={_labels}
        width={_.isString(width) && width.match(/^\d+$/) ? parseInt(width, 10) : width}
        height={_.isString(height) && height.match(/^\d+$/) ? parseInt(height, 10) : height}
        currentPage={_currentPage}
        numberPages={_numberPages}
        onLoadSuccess={handleOnLoadSuccess}
        onContentClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onContentClick(file)
        }}
      />
    </div>
  )
}

File.propTypes = {
  animate: PT.bool,
  className: PT.string,
  buttons: PT.oneOf(['visible', 'hover', 'none']),
  file: PT.object.isRequired,
  height: PT.oneOfType([PT.number, PT.string]),
  initialPage: PT.number,
  labels: PT.object,
  onAddFile: PT.func,
  onContentClick: PT.func,
  onDeleteFile: PT.func,
  onDownloadFile: PT.func,
  onLoadSuccess: PT.func,
  onPreviewFile: PT.func,
  onPreviousPage: PT.func,
  onNextPage: PT.func,
  scale: PT.number,
  showAddButton: PT.bool,
  showDeleteButton: PT.bool,
  showDownloadButton: PT.bool,
  showPreviewButton: PT.bool,
  width: PT.oneOfType([PT.number, PT.string])
}
File.displayName = 'File'
export default File
