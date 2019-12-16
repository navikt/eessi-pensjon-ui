import { Widget, WidgetComponentProps } from 'applications/Dashboard/declarations/Dashboard'
import NodeWidget from 'applications/Dashboard/widgets/Note/NoteWidget'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React, { useState } from 'react'

const NoteOptionsWidget = ({ onUpdate, widget }: WidgetComponentProps): JSX.Element => {
  const [backgroundColor, setBackgroundColor] = useState(widget!.options.backgroundColor)

  const chooseColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const color: string = e.target.value
    const newWidget: Widget = _.cloneDeep(widget!)
    newWidget.options.backgroundColor = color
    setBackgroundColor(color)
    if (_.isFunction(onUpdate)) {
      onUpdate(newWidget)
    }
  }

  return (
    <div className='w-NoteOptionsWidget p-3'>
      <Nav.Select
        id='w-NoteOptionsWidget__color-select-id'
        label='color'
        value={backgroundColor || ''}
        onChange={chooseColor}
      >
        {NodeWidget.properties.options.availableColors.map((color: string) => {
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
  onUpdate: PT.func.isRequired,
  widget: PT.object.isRequired
}

export default NoteOptionsWidget
