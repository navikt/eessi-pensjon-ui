import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import './Other.css'

export const Other = ({ className, file, height, labels, onContentClick, scale, width }) => (
  <div
    className={classNames('c-file-Other', className)}
    title={file.name + '\n' + labels.size + ': ' + file.size}
  >
    <div
      className='content'
      style={{
        width: ((width || 100) * scale) + 'px',
        height: ((height || 140) * scale) + 'px'
      }}
      onClick={onContentClick}
    >
      <div className='extension'>
        {file.name ? file.name.substring(file.name.lastIndexOf('.') + 1) : ''}
      </div>
    </div>
  </div>
)

Other.propTypes = {
  className: PT.string,
  file: PT.object.isRequired,
  height: PT.number,
  labels: PT.object.isRequired,
  onContentClick: PT.func,
  scale: PT.number.isRequired,
  width: PT.number
}
Other.displayName = 'Other'
export default Other
