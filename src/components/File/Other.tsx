import classNames from 'classnames'
import { FilePropType } from 'declarations/types.pt'
import PT from 'prop-types'
import React from 'react'
import { FileProps } from './File'
import './Other.css'

export const Other: React.FC<FileProps> = ({
  className, file, height, labels, onClick, overlay, width
}: FileProps): JSX.Element => (
  <div
    className={classNames('c-file-Other', className)}
    title={file.name + '\n' + labels.size + ': ' + file.size}
  >
    {overlay}
    <div
      className='content'
      style={{
        width: width + 'px',
        height: height + 'px'
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
  file: FilePropType.isRequired,
  height: PT.number.isRequired,
  labels: PT.object.isRequired,
  onClick: PT.func.isRequired,
  overlay: PT.element.isRequired,
  width: PT.number.isRequired
}
export default Other
