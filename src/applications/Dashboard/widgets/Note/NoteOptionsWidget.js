import React, { useState } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import * as Nav from '../../../../Nav'
import NodeWidget from './NoteWidget'

const NoteOptionsWidget = ({ layout, onWidgetUpdate, widget }) => {
  const [backgroundColor, setBackgroundColor] = useState(widget.options.backgroundColor)

  const chooseColor = (e) => {
    const color = e.target.value
    const newWidget = _.cloneDeep(widget)
    newWidget.options.backgroundColor = color
    setBackgroundColor(color)
    onWidgetUpdate(newWidget, layout)
  }

  return (
    <div className='w-NoteOptionsWidget p-3'>
      <Nav.Select
        id='w-NoteOptionsWidget__color-select-id'
        label='color'
        value={backgroundColor || ''}
        onChange={chooseColor}
      >
        {NodeWidget.properties.options.availableColors.map(color => {
          return <option key={color} value={color}>{color}</option>
        })}
      </Nav.Select>
      <br />
      <br />
      <br />
    </div>
  )
}

NoteOptionsWidget.propTypes = {
  layout: PT.object.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  widget: PT.object.isRequired
}

export default NoteOptionsWidget
