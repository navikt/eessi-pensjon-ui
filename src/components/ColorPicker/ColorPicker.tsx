import classNames from 'classnames'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useState } from 'react'
import { ColorChangeHandler, ColorResult, RGBColor, SketchPicker } from 'react-color'
import './ColorPicker.css'

export interface ColorPickerProps {
  className ?: string;
  initialColor ?: RGBColor;
  onColorChanged: (c: ColorResult) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  className, initialColor, onColorChanged
}: ColorPickerProps): JSX.Element => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false)
  const [_color, setColor] = useState<RGBColor>(initialColor || { r: 255, g: 255, b: 255, a: 1 })

  const toggleColorDisplay = (): void => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const closeColorPicker = (): void => {
    setDisplayColorPicker(false)
  }

  const onChangeComplete: ColorChangeHandler = (color: ColorResult) => {
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
  initialColor: PT.any,
  onColorChanged: PT.func.isRequired
}

ColorPicker.displayName = 'ColorPicker'
export default ColorPicker
