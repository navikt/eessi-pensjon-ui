import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import './Other.css'

export const Other = ({
  animate, className, deleteLink, downloadLink, file, index, isHovering, labels = { size: 'Størrelse', download: 'Last ned' },
  onClick = () => {}, onDeleteDocument, scale, size
}) => {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1)

  return (
    <div
      className={classNames('c-file-Other', className, { animate: animate })}
      title={file.name + '\n' + labels.size + ': ' + size}
    >
      {isHovering && deleteLink
        ? (
          <div className='link deleteLink'>
            <Icons kind='trashcan' size={15} onClick={() => onDeleteDocument(index)} />
          </div>
        ) : null}
      {isHovering && downloadLink && file.content
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
        )
        : null}
      <div
        className='content' style={{
          width: (90 * scale) + 'px',
          height: (140 * scale) + 'px'
        }} onClick={() => onClick(index)}
      >
        <div className='extension'>{extension}</div>
      </div>
    </div>
  )
}

Other.propTypes = {
  animate: PT.bool,
  className: PT.string,
  file: PT.object.isRequired,
  index: PT.number,
  isHovering: PT.bool,
  labels: PT.object,
  onClick: PT.func,
  onDeleteDocument: PT.func,
  size: PT.string
}
Other.displayName = 'Other'
export default Other
