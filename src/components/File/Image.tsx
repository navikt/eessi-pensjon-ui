import classNames from 'classnames'
import { FileProps } from 'components/File/File'
import { FilePropType } from 'declarations/types.pt'
import PT from 'prop-types'
import React from 'react'
import './Image.css'

export const Image: React.FC<FileProps> = ({
  className, file, height, labels, onClick, overlay, size
}: FileProps): JSX.Element => (
  <div
    className={classNames('c-file-Image', className)}
    title={'' + file.name + '\n' + labels.size + ': ' + size}
  >
    {overlay}
    <div className='content' onClick={onClick}>
      <img
        alt={file.name}
        style={{ maxHeight: height + 'px' }}
        src={'data:' + file.mimetype + ';base64,' + file.content.base64}
      />
    </div>
  </div>
)

Image.propTypes = {
  className: PT.string,
  file: FilePropType.isRequired,
  height: PT.number.isRequired,
  labels: PT.object.isRequired,
  onClick: PT.func.isRequired,
  overlay: PT.element.isRequired,
  size: PT.string.isRequired
}
Image.displayName = 'Image'
export default Image
