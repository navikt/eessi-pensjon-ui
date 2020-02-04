import bytes from 'bytes'
import classNames from 'classnames'
import defaultLabels from 'components/File/File.labels'
import Image from 'components/File/Image'
import Other from 'components/File/Other'
import Pdf from 'components/File/Pdf'
import { File, Labels } from 'declarations/types.d'
import { FilePropType, LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useCallback, useState } from 'react'
import Icons from '../Icons/Icons'
import './File.css'

const renderBytes = (_bytes: number): string => {
  if (!_bytes) {
    return '-'
  }
  return bytes(_bytes)
}

export interface FileProps {
  className ?: string;
  currentPage ?: number;
  numberPages ?: number;
  file: File;
  buttons?: string;
  height?: number;
  labels: Labels,
  onClick: (e: React.MouseEvent) => void;
  onLoadSuccess ?: (e: LoadEvent) => void;
  scale?: number;
  size: string;
  tema?: string;
  width?: number;
}

export interface ThisFileProps {
  animate?: boolean;
  buttons?: string;
  className ?: string;
  file: File;
  height ?: number | string;
  initialPage ?: number;
  initialLabels?: Labels;
  onAddFile?: (file: File) => void;
  onContentClick?: (file: File) => void;
  onDeleteFile?: (file: File) => void;
  onDownloadFile?: (file: File) => void;
  onLoadSuccess?: (file: File) => void;
  onPreviewFile?: (file: File, initialPage: number) => void;
  onPreviousPage?: (file: File) => void;
  onNextPage?: (file: File) => void;
  scale?: number;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showDownloadButton?: boolean;
  showPreviewButton?: boolean;
  tema?: string;
  width?: string | number;
}

interface LoadEvent {
  numPages: number;
}

const FileFC: React.FC<ThisFileProps> = (props: ThisFileProps): JSX.Element => {
  const {
    animate = true, className, initialPage, file = {} as File, buttons = 'hover', height, initialLabels = {} as Labels,
    onAddFile, onContentClick, onDeleteFile, onDownloadFile, onLoadSuccess, onPreviewFile, onPreviousPage, onNextPage,
    showAddButton = false, showDeleteButton = false, showDownloadButton = false, showPreviewButton = false, scale = 1.0,
    tema = 'paper', width
  } = props

  const [isHovering, setIsHovering] = useState<boolean>(buttons === 'visible')
  const [_currentPage, setCurrentPage] = useState<number>(initialPage || 1)
  const [_numberPages, setNumberPages] = useState<number>(0)
  const _size: string = file && file.size !== undefined ? renderBytes(file.size) : '-'
  const _labels: Labels = { ...defaultLabels, ...initialLabels }
  const onHandleMouseEnter = () => { if (buttons === 'hover') setIsHovering(true) }
  const onHandleMouseOver = () => { if (buttons === 'hover') setIsHovering(true) }
  const onHandleMouseLeave = () => { if (buttons === 'hover') setIsHovering(false) }

  const handlePreviousPageRequest = (e: React.MouseEvent): void => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(_currentPage - 1)
    if (_.isFunction(onPreviousPage) && file) {
      onPreviousPage(file)
    }
  }

  const handleNextPageRequest = (e: React.MouseEvent): void => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPage(_currentPage + 1)
    if (_.isFunction(onNextPage) && file) {
      onNextPage(file)
    }
  }

  const handleOnLoadSuccess = useCallback((e: LoadEvent): void => {
    setNumberPages(e.numPages)
    if (typeof onLoadSuccess === 'function') {
      onLoadSuccess({
        ...file,
        numPages: e.numPages
      } as File)
    }
  }, [file, setNumberPages, onLoadSuccess])

  const isPreviewable = (file: File): boolean => {
    return file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')
  }

  let Component: React.FC<FileProps> = Other

  if (file && file.mimetype && file.mimetype === 'application/pdf') {
    Component = Pdf
  }
  if (file && file.mimetype && file.mimetype.startsWith('image/')) {
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
          {showAddButton && isHovering && onAddFile ? (
            <div
              className='link addLink'
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
                onAddFile(file)
              }}
            >
              <Icons kind='vedlegg' size={20} />
            </div>
          ) : null}
          {showDeleteButton && onDeleteFile && isHovering ? (
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
          {showPreviewButton && isHovering && onPreviewFile && isPreviewable(file) ? (
            <div
              className='link previewLink'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onPreviewFile(file, _currentPage)
              }}
            >
              <Icons style={{ cursor: 'pointer' }} size={16} kind='view' />
            </div>
          ) : null}
          {showDownloadButton && isHovering && onDownloadFile && file.content && file.content.base64 ? (
            <div className='link downloadLink'>
              <a
                onClick={(e) => {
                  e.stopPropagation()
                  onDownloadFile(file)
                }}
                title={_labels.download}
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
                ◀
              </a>
            ) : null}
          {_currentPage < _numberPages && isHovering
            ? (
              <a
                href='#nextPage'
                className='nextPage'
                onClick={handleNextPageRequest}
              >
                ▶
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
        tema={tema}
        width={(_.isString(width) && (width as string).match(/^\d+$/) ? parseInt(width, 10) : width) as number}
        height={(_.isString(height) && (height as string).match(/^\d+$/) ? parseInt(height, 10) : height) as number}
        currentPage={_currentPage}
        numberPages={_numberPages}
        onLoadSuccess={handleOnLoadSuccess}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          if (_.isFunction(onContentClick)) {
            onContentClick(file)
          }
        }}
      />
    </div>
  )
}

FileFC.propTypes = {
  animate: PT.bool,
  className: PT.string,
  buttons: PT.oneOf(['visible', 'hover', 'none']),
  file: FilePropType.isRequired,
  height: PT.number,
  initialPage: PT.number,
  initialLabels: LabelsPropType,
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
  tema: PT.oneOf(['paper', 'simple']),
  width: PT.number
}

export default FileFC
