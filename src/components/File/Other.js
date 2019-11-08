import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
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
        width: _.isString(width) ? width : ((width || 100) * scale) + 'px',
        height: _.isString(height) ? height : ((height || 140) * scale) + 'px'
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
  height: PT.oneOfType([PT.number, PT.string]),
  labels: PT.object.isRequired,
  onContentClick: PT.func,
  scale: PT.number.isRequired,
  width: PT.oneOfType([PT.number, PT.string])
}
Other.displayName = 'Other'
export default Other
