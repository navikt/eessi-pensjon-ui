import classNames from 'classnames'
import PT from 'prop-types'
import React from 'react'
import { FileProps, IFile } from './File'
import './Other.css'

export const Other: React.FC<FileProps> = ({
  className, file, height, labels, onClick, scale, width
}: FileProps): JSX.Element => (
  <div
    className={classNames('c-file-Other', className)}
    title={file.name + '\n' + labels.size + ': ' + file.size}
  >
    <div
      className='content'
      style={{
        width: ((width || 100) * scale!) + 'px',
        height: ((height || 140) * scale!) + 'px'
      }}
      onClick={onClick}
    >
      <div className='extension'>
        {file.name ? file.name.substring(file.name.lastIndexOf('.') + 1) : ''}
      </div>
    </div>
  </div>
)

Other.propTypes = {
  className: PT.string,
  file: PT.oneOf<IFile>([]).isRequired,
  height: PT.number,
  labels: PT.object.isRequired,
  onClick: PT.func.isRequired,
  scale: PT.number.isRequired,
  width: PT.number
}
export default Other
