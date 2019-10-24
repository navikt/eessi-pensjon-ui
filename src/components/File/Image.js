import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import './Image.css'

export const Image = ({ className, file, height, labels, onContentClick, scale, size }) => (
  <div
    className={classNames('c-file-Image', className)}
    title={'' + file.name + '\n' + labels.size + ': ' + size}
  >
    <div className='content' onClick={onContentClick}>
      <img
        alt={file.name}
        style={{ maxHeight: ((height || 100) * scale) + 'px' }}
        src={'data:' + file.mimetype + ';base64,' + file.content.base64}
      />
    </div>
  </div>
)

Image.propTypes = {
  className: PT.string,
  file: PT.object.isRequired,
  height: PT.number,
  labels: PT.object.isRequired,
  onContentClick: PT.func,
  scale: PT.number.isRequired,
  size: PT.string
}
Image.displayName = 'Image'
export default Image
