import React, { useState } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { SketchPicker } from 'react-color'
import './ColorPicker.css'

const ColorPicker = ({ className, initialColor, onColorChanged }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [_color, setColor] = useState(initialColor || { r: 255, g: 255, b: 255, a: 1 })

  const toggleColorDisplay = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const closeColorPicker = () => {
    setDisplayColorPicker(false)
  }

  const onChangeComplete = (color) => {
    if (_(onColorChanged).isFunction()) {
      onColorChanged(color)
    }
    setColor(color.rgb)
  }

  return (
    <div className={classNames('c-colorPicker', className)}>
      <div className='c-colorPicker__swatch' onClick={toggleColorDisplay}>
        <div
          className='c-colorPicker__color' style={{
            background: `rgba(${_color.r}, ${_color.g}, ${_color.b}, ${_color.a})`
          }}
        />
      </div>
      {displayColorPicker
        ? (
          <div className='c-colorPicker__popover'>
            <div className='c-colorPicker__cover' onClick={closeColorPicker} />
            <SketchPicker color={_color} onChangeComplete={onChangeComplete} />
          </div>
        )
        : null}
    </div>
  )
}

ColorPicker.propTypes = {
  className: PT.string,
  color: PT.object.isRequired,
  onColorChanged: PT.func.isRequired
}

ColorPicker.displayName = 'ColorPicker'
export default ColorPicker
