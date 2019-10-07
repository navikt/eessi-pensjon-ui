import React, { useState } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

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

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${_color.r}, ${_color.g}, ${_color.b}, ${_color.a})`
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'sticky',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  })

  return (
    <div className={classNames('c-colorPicker', className)}>
      <div className='c-colorPicker__container' style={styles.swatch} onClick={toggleColorDisplay}>
        <div style={styles.color} />
      </div>
      {displayColorPicker
        ? (
          <div className='c-colorPicker__popover' style={styles.popover}>
            <div className='c-colorPicker__cover' style={styles.cover} onClick={closeColorPicker} />
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
