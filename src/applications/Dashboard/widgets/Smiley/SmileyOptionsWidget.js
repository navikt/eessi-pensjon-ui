import React, { useState } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import * as Nav from '../../../../Nav'
import SmileyWidget from './SmileyWidget'

const SmileyOptionsWidget = ({ layout, onWidgetUpdate, widget }) => {
  const [mood, setMood] = useState(widget.options.mood)

  const chooseMood = (e) => {
    const newWidget = _.cloneDeep(widget)
    newWidget.options.mood = e.target.value
    setMood(e.target.value)
    onWidgetUpdate(newWidget, layout)
  }

  return (
    <div className='w-SmileyOptionsWidget p-3'>
      <Nav.Select
        id='w-SmileyOptionsWidget__mood-select-id'
        label='mood'
        value={mood || ''}
        onChange={chooseMood}
      >
        {SmileyWidget.properties.options.availableMoods.map(_mood => {
          return <option key={_mood.label} value={_mood.value}>{_mood.label}{' - '}{_mood.value}</option>
        })}
      </Nav.Select>
    </div>
  )
}

SmileyOptionsWidget.propTypes = {
  layout: PT.object.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  widget: PT.object.isRequired
}

export default SmileyOptionsWidget
