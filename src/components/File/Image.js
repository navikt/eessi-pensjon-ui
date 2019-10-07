import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import './Image.css'

export const Image = ({
  animate, className, deleteLink, downloadLink, file, index, isHovering,
  onClick = () => {}, labels = { size: 'Størrelse', download: 'Last ned' },
  onDeleteDocument, onPreviewDocument, previewLink, scale, size
}) => {
  const title = '' + file.name + '\n' + labels.size + ': ' + size

  return (
    <div
      className={classNames('c-file-Image', className, { animate: animate })}
      title={title}
    >
      <div>
        {deleteLink && isHovering
          ? (
            <div
              className='link deleteLink'
              onClick={() => onDeleteDocument(index)}
            >
              <Icons kind='trashcan' size={15} />
            </div>
          )
          : null}
        {previewLink && isHovering
          ? (
            <div
              className='link previewLink'
              onClick={() => onPreviewDocument(index)}
            >
              <Icons style={{ cursor: 'pointer' }} size='1x' kind='view' />
            </div>
          ) : null}
        {downloadLink && isHovering
          ? (
            <div className='link downloadLink'>
              <a
                onClick={(e) => e.stopPropagation()} title={labels.download}
                href={'data:application/octet-stream;base64,' + encodeURIComponent(file.content.base64)}
                download={file.name}
              >
                <Icons size='sm' kind='download' />
              </a>
            </div>
          ) : null}
        <div className='content' onClick={() => onClick(index)}>
          <img
            alt={file.name}
            style={{ maxWidth: (100 * scale) + 'px' }}
            src={'data:' + file.mimetype + ';base64,' + file.content.base64}
          />
        </div>
      </div>
    </div>
  )
}

Image.propTypes = {
  animate: PT.bool,
  className: PT.string,
  deleteLink: PT.bool,
  downloadLink: PT.bool,
  file: PT.object.isRequired,
  index: PT.number,
  isHovering: PT.bool,
  onClick: PT.func,
  onDeleteDocument: PT.func,
  scale: PT.number.isRequired,
  size: PT.string
}
Image.displayName = 'Image'
export default Image
