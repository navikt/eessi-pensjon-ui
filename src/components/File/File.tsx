import bytes from 'bytes'
import classNames from 'classnames'
import defaultLabels from 'components/File/File.labels'
import FileOverlay from 'components/File/FileOverlay'
import Image from 'components/File/Image'
import Other from 'components/File/Other'
import Pdf from 'components/File/Pdf'
import { File, Labels } from 'declarations/types.d'
import { FilePropType, LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useCallback, useState } from 'react'
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
  height: number;
  labels: Labels,
  onClick: (e: React.MouseEvent) => void;
  onLoadSuccess ?: (e: LoadEvent) => void;
  overlay: JSX.Element;
  scale?: number;
  size: string;
  tema?: string;
  viewOnePage?: boolean;
  width: number;
}

export interface ThisFileProps {
  animate?: boolean;
  buttonsVisibility?: 'always' | 'hover' | 'none';
  buttonsPosition?: 'header' | 'inside';
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
  onPreviewFile?: (file: File, initialPage?: number) => void;
  onPreviousPage?: (file: File) => void;
  onNextPage?: (file: File) => void;
  scale?: number;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showDownloadButton?: boolean;
  showPreviewButton?: boolean;
  tema?: string;
  viewOnePage?: boolean;
  width?: string | number;
}

interface LoadEvent {
  numPages: number;
}

const FileFC: React.FC<ThisFileProps> = (props: ThisFileProps): JSX.Element => {
  const {
    animate = true, className, initialPage, file = {} as File, buttonsVisibility = 'hover', buttonsPosition = 'inside',
    height, initialLabels = {} as Labels, onAddFile, onContentClick, onDeleteFile, onDownloadFile, onLoadSuccess,
    onPreviewFile, onPreviousPage, onNextPage, showAddButton = false, showDeleteButton = false,
    showDownloadButton = false, showPreviewButton = false, scale = 1.0, tema = 'paper', viewOnePage = true, width
  } = props
  const [isHovering, setIsHovering] = useState<boolean>(viewOnePage && buttonsVisibility === 'always')
  const [_currentPage, setCurrentPage] = useState<number>(initialPage || 1)
  const [_numberPages, setNumberPages] = useState<number>(0)
  const _size: string = file && file.size !== undefined ? renderBytes(file.size) : '-'
  const _labels: Labels = { ...defaultLabels, ...initialLabels }
  const onHandleMouseEnter = () => { if (viewOnePage && buttonsVisibility === 'hover') setIsHovering(true) }
  const onHandleMouseOver = () => { if (viewOnePage && buttonsVisibility === 'hover') setIsHovering(true) }
  const onHandleMouseLeave = () => { if (viewOnePage && buttonsVisibility === 'hover') setIsHovering(false) }

  let _width = (_.isString(width) && (width as string).match(/^\d+$/) ? parseInt(width, 10) : width) as number
  let _height = (_.isString(height) && (height as string).match(/^\d+$/) ? parseInt(height, 10) : height) as number
  if (!_width) {
    _width = 100 * scale
    _height = 140 * scale
  }

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
    >
      <Component
        {...props}
        tema={tema}
        size={_size}
        labels={_labels}
        width={_width}
        height={_height}
        currentPage={_currentPage}
        numberPages={_numberPages}
        onLoadSuccess={handleOnLoadSuccess}
        overlay={(
          <FileOverlay
            buttonsVisibility={buttonsVisibility}
            buttonsPosition={buttonsPosition}
            currentPage={_currentPage}
            file={file}
            handleNextPageRequest={handleNextPageRequest}
            handlePreviousPageRequest={handlePreviousPageRequest}
            height={_height}
            isHovering={isHovering}
            labels={_labels}
            numberPages={_numberPages}
            onAddFile={onAddFile}
            onDeleteFile={onDeleteFile}
            onDownloadFile={onDownloadFile}
            onPreviewFile={onPreviewFile}
            showAddButton={showAddButton}
            showDeleteButton={showDeleteButton}
            showDownloadButton={showDownloadButton}
            showPreviewButton={showPreviewButton}
            viewOnePage={viewOnePage}
            width={_width}
          />
        )}
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
  buttonsVisibility: PT.oneOf(['always', 'hover', 'none']),
  buttonsPosition: PT.oneOf(['header', 'inside']),
  viewOnePage: PT.bool,
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
