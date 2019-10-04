import React, { useState } from 'react'
import PT from 'prop-types'
import bytes from 'bytes'
import Other from './Other'
import Pdf from './Pdf'
import Image from './Image'
import './File.css'

const renderBytes = (_bytes) => {
  if (!_bytes) {
    return '-'
  }
  return bytes(_bytes)
}

const File = (props) => {
  const { animate = true, file, scale = 1.0, ui = 'paper' } = props
  const [isHovering, setIsHovering] = useState(false)
  const _size = file && file.size !== undefined ? renderBytes(file.size) : 0

  const onHandleMouseEnter = () => {
    setIsHovering(true)
  }

  const onHandleMouseLeave = () => {
    setIsHovering(false)
  }

  let Component = Other
  if (file.mimetype && file.mimetype === 'application/pdf') {
    Component = Pdf
  }
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    Component = Image
  }

  return (
    <div
      className='c-file'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <Component
        isHovering={isHovering}
        animate={animate}
        size={_size}
        scale={scale}
        ui={ui}
        {...props}
      />
    </div>
  )
}

File.propTypes = {
  animate: PT.bool,
  file: PT.object.isRequired,
  scale: PT.number,
  ui: PT.string
}
File.displayName = 'File'
export default File
