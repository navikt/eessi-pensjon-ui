import classNames from 'classnames'
import { File, Labels } from 'declarations/types.d'
import { FilePropType, LabelsPropType } from 'declarations/types.pt'
import PT from 'prop-types'
import React from 'react'
import Icons from '../Icons/Icons'

export interface FileOverlayProps {
  buttonsVisibility?: 'always' | 'hover' | 'none';
  buttonsPosition?: 'header' | 'inside';
  currentPage?: number;
  file: File;
  height ?: number | string;
  handlePreviousPageRequest?: (e: React.MouseEvent) => void;
  handleNextPageRequest?: (e: React.MouseEvent) => void;
  labels: Labels;
  isHovering: boolean;
  numberPages?: number;
  onAddFile?: (file: File) => void;
  onDeleteFile?: (file: File) => void;
  onDownloadFile?: (file: File) => void;
  onPreviewFile?: (file: File, initialPage?: number) => void;
  scale?: number;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showDownloadButton?: boolean;
  showPreviewButton?: boolean;
  viewOnePage?: boolean;
  width?: string | number;
}

const FileOverlay: React.FC<FileOverlayProps> = (props: FileOverlayProps): JSX.Element => {
  const {
    buttonsVisibility = 'hover', buttonsPosition = 'inside', currentPage = undefined, file = {} as File, height,
    handlePreviousPageRequest, handleNextPageRequest, labels, isHovering, numberPages, onAddFile, onDeleteFile,
    onDownloadFile, onPreviewFile, showAddButton = false, showDeleteButton = false,
    showDownloadButton = false, showPreviewButton = false, viewOnePage = true, width
  } = props

  const displayButton = () => {
    return buttonsVisibility === 'always' || isHovering
  }

  const isPreviewable = (file: File): boolean => {
    return file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')
  }

  return (
    <div
      className={classNames('overlay', 'overlay-' + buttonsPosition)}
      style={file.mimetype === 'application/pdf' && buttonsPosition === 'inside' ? {
        width: width + 'px',
        height: height + 'px'
      } : {}}
    >
      <div className='overlay-top'>
        {showAddButton && onAddFile && displayButton() ? (
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
        {showDeleteButton && onDeleteFile && displayButton() ? (
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
        {showPreviewButton && onPreviewFile && displayButton() && isPreviewable(file) ? (
          <div
            className='link previewLink'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onPreviewFile(file, currentPage)
            }}
          >
            <Icons style={{ cursor: 'pointer' }} size={16} kind='view' />
          </div>
        ) : null}
        {showDownloadButton && onDownloadFile && displayButton() && file.content && file.content.base64 ? (
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
      <div className='overlay-middle'>
        {viewOnePage && currentPage && handlePreviousPageRequest && currentPage > 1 && displayButton()
          ? (
            <a
              href='#previousPage'
              className='previousPage'
              onClick={handlePreviousPageRequest}
            >
              ◀
            </a>
          ) : null}
        {viewOnePage && currentPage && handleNextPageRequest && numberPages && currentPage < numberPages && displayButton()
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
      <div className='overlay-bottom'>
        {viewOnePage && displayButton() && file.mimetype === 'application/pdf'
          ? (
            <div className='pageNumber'>
              {currentPage}
            </div>
          ) : null}
      </div>
    </div>
  )
}

FileOverlay.propTypes = {
  buttonsVisibility: PT.oneOf(['always', 'hover', 'none']),
  buttonsPosition: PT.oneOf(['header', 'inside']),
  viewOnePage: PT.bool,
  file: FilePropType.isRequired,
  handleNextPageRequest: PT.func,
  handlePreviousPageRequest: PT.func,
  height: PT.number,
  labels: LabelsPropType.isRequired,
  numberPages: PT.number,
  onAddFile: PT.func,
  onDeleteFile: PT.func,
  onDownloadFile: PT.func,
  onPreviewFile: PT.func,
  showAddButton: PT.bool,
  showDeleteButton: PT.bool,
  showDownloadButton: PT.bool,
  showPreviewButton: PT.bool,
  width: PT.number
}

export default FileOverlay
