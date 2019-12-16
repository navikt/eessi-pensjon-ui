import classNames from 'classnames'
import { FileProps, IFile } from 'components/File/File'
import PT from 'prop-types'
import React from 'react'
import './Image.css'

export const Image: React.FC<FileProps> = ({
  className, file, height, labels, onClick, scale, size
}: FileProps): JSX.Element => (
  <div
    className={classNames('c-file-Image', className)}
    title={'' + file.name + '\n' + labels.size + ': ' + size}
  >
    <div className='content' onClick={onClick}>
      <img
        alt={file.name}
        style={{ maxHeight: ((height || 100) * scale!) + 'px' }}
        src={'data:' + file.mimetype + ';base64,' + file.content.base64}
      />
    </div>
  </div>
)

Image.propTypes = {
  className: PT.string,
  file: PT.oneOf<IFile>([]).isRequired,
  height: PT.number,
  labels: PT.object.isRequired,
  onClick: PT.func.isRequired,
  scale: PT.number.isRequired,
  size: PT.string.isRequired
}
Image.displayName = 'Image'
export default Image
